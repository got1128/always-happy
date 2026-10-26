// Receives a pilot profile. New applicants get an account created with the
// password they chose (email verification link is sent by us via Resend);
// signed-in applicants whose case needs more information can resubmit.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { corsHeaders, json } from '../_shared/cors.ts';
import { normalizeApplication } from '../_shared/fields.ts';
import { receivedEmail, reviewerEmail, sendMail, siteUrl } from '../_shared/mail.ts';
import { signReviewToken } from '../_shared/token.ts';

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const LANGUAGES = ['zh-Hant', 'zh-Hans', 'en'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const body = await req.json().catch(() => null);
  if (!body) return json({ error: 'invalid' }, 400);
  // Honeypot: real visitors never see or fill this field.
  if (body.website) return json({ error: 'invalid' }, 400);

  const { data: fields, errors } = normalizeApplication(body.application);
  const language = LANGUAGES.includes(body.language) ? body.language : 'zh-Hant';

  const jwt = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  const { data: auth } = jwt ? await admin.auth.getUser(jwt) : { data: { user: null } };
  let user = auth?.user ?? null;
  if (user) fields.email = user.email!;
  if (errors.filter((k) => !(user && k === 'email')).length) return json({ error: 'invalid', fields: errors }, 400);

  const now = new Date().toISOString();
  let app: Record<string, unknown>;
  let resubmitted = false;
  let confirmUrl: string | undefined;

  if (user) {
    const { data: existing } = await admin.from('pilot_applications').select('id, status, version').eq('user_id', user.id).maybeSingle();
    if (existing && existing.status !== 'needs_info') return json({ error: 'not_editable', status: existing.status }, 409);
    if (existing) {
      resubmitted = true;
      const { data, error } = await admin
        .from('pilot_applications')
        .update({ ...fields, language, status: 'submitted', version: existing.version + 1, consent_at: now, submitted_at: now, updated_at: now })
        .eq('id', existing.id)
        .eq('status', 'needs_info')
        .select()
        .single();
      if (error) return json({ error: 'server' }, 500);
      app = data;
    } else {
      const { data, error } = await admin.from('pilot_applications').insert({ ...fields, user_id: user.id, language, consent_at: now }).select().single();
      if (error) return json({ error: 'server' }, 500);
      app = data;
    }
  } else {
    const password = typeof body.password === 'string' ? body.password : '';
    if (password.length < 8 || password.length > 72) return json({ error: 'invalid', fields: ['password'] }, 400);
    const { data: link, error: linkError } = await admin.auth.admin.generateLink({
      type: 'signup',
      email: String(fields.email),
      password,
      options: { redirectTo: `${siteUrl()}/for-pilots/` },
    });
    if (linkError) {
      const exists = linkError.code === 'email_exists' || linkError.status === 422 || /already/i.test(linkError.message);
      return json({ error: exists ? 'email_exists' : 'server' }, exists ? 409 : 500);
    }
    user = link.user;
    confirmUrl = link.properties.action_link;
    const { data, error } = await admin.from('pilot_applications').insert({ ...fields, user_id: user.id, language, consent_at: now }).select().single();
    if (error) {
      // Roll back the account so the applicant can simply try again.
      await admin.auth.admin.deleteUser(user.id);
      return json({ error: 'server' }, 500);
    }
    app = data;
  }

  await admin.from('pilot_application_events').insert({ application_id: app.id, action: resubmitted ? 'resubmitted' : 'submitted', actor: String(app.email) });

  // A failed email must not lose the submission; record it for follow-up instead.
  const failures: string[] = [];
  const reviewers = (Deno.env.get('REVIEWER_EMAILS') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  for (const reviewer of reviewers) {
    try {
      const token = await signReviewToken(String(app.id), Number(app.version), reviewer);
      const mail = reviewerEmail(app as never, `${siteUrl()}/review/#t=${token}`, resubmitted);
      await sendMail(reviewer, mail.subject, mail.html);
    } catch (e) {
      failures.push(`reviewer ${reviewer}: ${e}`);
    }
  }
  try {
    const mail = receivedEmail(app as never, resubmitted, confirmUrl);
    await sendMail(String(app.email), mail.subject, mail.html);
  } catch (e) {
    failures.push(`applicant: ${e}`);
  }
  if (failures.length) {
    console.error(failures);
    await admin.from('pilot_application_events').insert({ application_id: app.id, action: 'email_failed', note: failures.join('\n') });
  }

  return json({ case_no: app.case_no, status: app.status, new_account: Boolean(confirmUrl) });
});
