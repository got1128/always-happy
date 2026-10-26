// Reviewer actions from the signed link in the notification email.
// action: 'view' | 'approve' | 'request_info'
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { corsHeaders, json } from '../_shared/cors.ts';
import { displayRows } from '../_shared/fields.ts';
import { approvedEmail, needsInfoEmail, sendMail } from '../_shared/mail.ts';
import { verifyReviewToken } from '../_shared/token.ts';

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const body = await req.json().catch(() => ({}));
  const token = await verifyReviewToken(body.token);
  if (!token) return json({ error: 'invalid_token' }, 401);

  const { data: app } = await admin.from('pilot_applications').select('*').eq('id', token.a).maybeSingle();
  if (!app) return json({ error: 'invalid_token' }, 404);
  const actionable = app.status === 'submitted' && app.version === token.v;

  if (body.action === 'view') {
    return json({
      case_no: app.case_no,
      status: app.status,
      actionable,
      reviewer: token.r,
      submitted_at: app.submitted_at,
      review_note: app.review_note,
      rows: displayRows(app),
    });
  }

  if (body.action !== 'approve' && body.action !== 'request_info') return json({ error: 'invalid' }, 400);
  if (!actionable) return json({ error: 'not_actionable', status: app.status }, 409);
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 3000) : '';
  if (body.action === 'request_info' && !note) return json({ error: 'note_required' }, 400);

  const status = body.action === 'approve' ? 'approved' : 'needs_info';
  const now = new Date().toISOString();
  // Conditional update so two reviewers acting at once cannot both succeed.
  const { data: updated, error } = await admin
    .from('pilot_applications')
    .update({ status, review_note: note || null, reviewed_by: token.r, reviewed_at: now, updated_at: now })
    .eq('id', app.id)
    .eq('status', 'submitted')
    .eq('version', token.v)
    .select()
    .maybeSingle();
  if (error) return json({ error: 'server' }, 500);
  if (!updated) return json({ error: 'not_actionable' }, 409);

  await admin.from('pilot_application_events').insert({ application_id: app.id, action: status, actor: token.r, note: note || null });

  try {
    const mail = status === 'approved' ? approvedEmail(updated) : needsInfoEmail(updated, note);
    await sendMail(updated.email, mail.subject, mail.html);
  } catch (e) {
    console.error(e);
    await admin.from('pilot_application_events').insert({ application_id: app.id, action: 'email_failed', note: String(e) });
    return json({ status, email_sent: false });
  }
  return json({ status, email_sent: true });
});
