// Receives enquiries from the Become a Pilot, Cabin Crew and Airline
// Partnerships forms. No account or review workflow: store, notify staff
// (reply-to set to the enquirer) and confirm receipt to the enquirer.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { corsHeaders, json } from '../_shared/cors.ts';
import { ENQUIRY_TYPES, enquiryRows, normalizeEnquiry } from '../_shared/enquiry-fields.ts';
import { enquiryReceivedEmail, sendMail, staffEnquiryEmail } from '../_shared/mail.ts';

const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const LANGUAGES = ['zh-Hant', 'zh-Hans', 'en'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const body = await req.json().catch(() => null);
  if (!body || body.website || !(body.type in ENQUIRY_TYPES)) return json({ error: 'invalid' }, 400);
  const type: string = body.type;
  const { data, errors } = normalizeEnquiry(type, body.fields);
  if (errors.length) return json({ error: 'invalid', fields: errors }, 400);
  const language = LANGUAGES.includes(body.language) ? body.language : 'zh-Hant';
  const email = String(data.email).toLowerCase();

  // Simple throttle: one enquiry per email address every two minutes.
  const since = new Date(Date.now() - 2 * 60_000).toISOString();
  const { count } = await admin.from('service_enquiries').select('id', { count: 'exact', head: true }).eq('email', email).gte('created_at', since);
  if (count) return json({ error: 'too_many' }, 429);

  const { full_name, email: _email, ...rest } = data;
  const { data: row, error } = await admin
    .from('service_enquiries')
    .insert({ type, language, full_name, email, data: rest, consent_at: new Date().toISOString() })
    .select('id, case_no')
    .single();
  if (error) return json({ error: 'server' }, 500);

  const failures: string[] = [];
  const title = ENQUIRY_TYPES[type].title;
  const staff = (Deno.env.get('ENQUIRY_EMAILS') || Deno.env.get('REVIEWER_EMAILS') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const staffMail = staffEnquiryEmail(row.case_no, title, String(full_name), enquiryRows(type, data));
  for (const to of staff) {
    try {
      await sendMail(to, staffMail.subject, staffMail.html, email);
    } catch (e) {
      failures.push(`staff ${to}: ${e}`);
    }
  }
  try {
    const mail = enquiryReceivedEmail(row.case_no, language);
    await sendMail(email, mail.subject, mail.html);
  } catch (e) {
    failures.push(`enquirer: ${e}`);
  }
  if (failures.length) {
    console.error(failures);
    await admin.from('service_enquiries').update({ email_error: failures.join('\n') }).eq('id', row.id);
  }

  return json({ case_no: row.case_no });
});
