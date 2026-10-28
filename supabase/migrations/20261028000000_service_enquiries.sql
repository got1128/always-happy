-- Always Happy: enquiries from the Become a Pilot, Cabin Crew and Airline Partnerships forms.
-- Written only by the submit-enquiry Edge Function; no browser access.

create sequence if not exists public.enquiry_case_seq;

create table public.service_enquiries (
  id uuid primary key default gen_random_uuid(),
  case_no text not null unique default (
    'AHE-' || to_char(now() at time zone 'Asia/Taipei', 'YYYYMMDD') || '-' || lpad(nextval('public.enquiry_case_seq')::text, 4, '0')
  ),
  type text not null check (type in ('aspiring', 'cabin', 'airlines')),
  language text not null default 'zh-Hant' check (language in ('zh-Hant', 'zh-Hans', 'en')),
  full_name text not null,
  email text not null,
  -- Remaining form fields, validated per type by the Edge Function.
  data jsonb not null default '{}'::jsonb,
  consent_at timestamptz not null,
  email_error text,
  created_at timestamptz not null default now()
);

create index service_enquiries_email_created_idx on public.service_enquiries (email, created_at desc);

alter table public.service_enquiries enable row level security;
revoke all on public.service_enquiries from anon, authenticated;
