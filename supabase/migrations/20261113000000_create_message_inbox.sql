-- Public visitors can insert one text field only. An allowlisted Auth user can read,
-- mark read/unread, and delete. No administrative key is used by the browser app.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  created_at timestamptz not null default now(),
  is_read boolean not null default false,
  constraint messages_length_check check (char_length(message) between 1 and 2000),
  constraint messages_not_blank_check check (message ~ '[^[:space:]]')
);

create table if not exists private.message_owners (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);

alter table private.message_owners enable row level security;
revoke all on table private.message_owners from public, anon, authenticated;

create or replace function private.is_message_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.message_owners as owners
    where owners.user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_message_owner() from public, anon;
grant execute on function private.is_message_owner() to authenticated;

-- The public-schema wrapper is SECURITY INVOKER and returns only the caller's own
-- owner flag. The SECURITY DEFINER lookup stays in the unexposed private schema.
create or replace function public.is_message_owner()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_message_owner();
$$;

revoke all on function public.is_message_owner() from public, anon;
grant execute on function public.is_message_owner() to authenticated;

alter table public.messages enable row level security;
revoke all on table public.messages from public, anon, authenticated;
grant insert (message) on table public.messages to anon, authenticated;
grant select, delete on table public.messages to authenticated;
grant update (is_read) on table public.messages to authenticated;

create policy "public can submit valid messages"
  on public.messages
  for insert
  to anon, authenticated
  with check (
    char_length(message) between 1 and 2000
    and message ~ '[^[:space:]]'
  );

create policy "allowlisted owners can read messages"
  on public.messages
  for select
  to authenticated
  using ((select private.is_message_owner()));

create policy "allowlisted owners can mark messages read"
  on public.messages
  for update
  to authenticated
  using ((select private.is_message_owner()))
  with check ((select private.is_message_owner()));

create policy "allowlisted owners can delete messages"
  on public.messages
  for delete
  to authenticated
  using ((select private.is_message_owner()));
