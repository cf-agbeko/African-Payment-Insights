-- =========================================================
-- AFRICAN PAYMENTS INSIGHTS — SUPABASE SCHEMA
-- Run this once in your Supabase project's SQL editor
-- (Project dashboard -> SQL Editor -> New query -> paste -> Run).
-- It creates the two tables the site reads/writes, and opens
-- them up to the public anon key for read AND write.
--
-- SECURITY NOTE: there is no real server here, so there's no
-- way to check "is this request really the admin" at the
-- database level. These policies trust the front-end's login
-- screen the same way the old localStorage version did — it's
-- a convenience lock, not real security. Don't put anything in
-- this project you wouldn't be okay with a motivated visitor
-- editing directly via the API.
-- =========================================================

create table if not exists public.articles (
  id text primary key,
  title text not null,
  category text not null,
  author text not null,
  date date not null,
  read_time integer not null default 5,
  featured boolean not null default false,
  excerpt text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id text primary key,
  author_name text not null,
  author_role text,
  date date not null,
  body text not null,
  source_url text,
  source_label text,
  created_at timestamptz not null default now()
);

-- Row Level Security: must be ON for Supabase to allow any
-- client-side access at all, with explicit policies below
-- granting the public anon key full read/write.
alter table public.articles enable row level security;
alter table public.posts enable row level security;

drop policy if exists "Public read articles" on public.articles;
create policy "Public read articles" on public.articles
  for select using (true);

drop policy if exists "Public write articles" on public.articles;
create policy "Public write articles" on public.articles
  for all using (true) with check (true);

drop policy if exists "Public read posts" on public.posts;
create policy "Public read posts" on public.posts
  for select using (true);

drop policy if exists "Public write posts" on public.posts;
create policy "Public write posts" on public.posts
  for all using (true) with check (true);
