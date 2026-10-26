-- Always Happy V5: pilot applications, review audit log and member-only content.
-- Writes happen only through Edge Functions (service role); the browser can read
-- its own application and, once approved, member content.

create sequence if not exists public.pilot_case_seq;

create table public.pilot_applications (
  id uuid primary key default gen_random_uuid(),
  case_no text not null unique default (
    'AHP-' || to_char(now() at time zone 'Asia/Taipei', 'YYYYMMDD') || '-' || lpad(nextval('public.pilot_case_seq')::text, 4, '0')
  ),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted', 'needs_info', 'approved')),
  -- Incremented on every (re)submission; review links are bound to one version.
  version integer not null default 1,
  language text not null default 'zh-Hant' check (language in ('zh-Hant', 'zh-Hans', 'en')),

  full_name text not null,
  email text not null,
  phone text not null,
  location text,
  nationality text,
  contact_time text,
  employment_status text,
  current_airline text,
  previous_airlines text,
  role text,
  employment_period text,
  licence text not null,
  licence_country text,
  aircraft_types text,
  type_rating text,
  total_hours integer not null check (total_hours >= 0),
  pic_hours integer check (pic_hours >= 0),
  english text,
  target_location text,
  work_type text,
  availability text,
  notes text,

  consent_at timestamptz not null,
  review_note text,
  reviewed_by text,
  reviewed_at timestamptz,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pilot_application_events (
  id bigint generated always as identity primary key,
  application_id uuid not null references public.pilot_applications (id) on delete cascade,
  action text not null,
  actor text,
  note text,
  created_at timestamptz not null default now()
);

create table public.member_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.pilot_applications enable row level security;
alter table public.pilot_application_events enable row level security;
alter table public.member_content enable row level security;

-- Applicants read their own application; reviewer identity stays server-side.
revoke all on public.pilot_applications from anon, authenticated;
grant select (
  id, case_no, user_id, status, language,
  full_name, email, phone, location, nationality, contact_time, employment_status,
  current_airline, previous_airlines, role, employment_period, licence, licence_country,
  aircraft_types, type_rating, total_hours, pic_hours, english, target_location,
  work_type, availability, notes, review_note, submitted_at, reviewed_at
) on public.pilot_applications to authenticated;

create policy "applicants read own application"
  on public.pilot_applications for select to authenticated
  using (user_id = auth.uid());

revoke all on public.pilot_application_events from anon, authenticated;

create or replace function public.is_approved_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.pilot_applications
    where user_id = auth.uid() and status = 'approved'
  );
$$;

revoke all on function public.is_approved_member() from public, anon;
grant execute on function public.is_approved_member() to authenticated;

revoke all on public.member_content from anon, authenticated;
grant select on public.member_content to authenticated;

create policy "approved pilots read member content"
  on public.member_content for select to authenticated
  using (published and public.is_approved_member());
