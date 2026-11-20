-- KlassenLive v2: shared live-test/dictation sessions. Run ONCE in Supabase SQL Editor.
-- Does not delete or alter kc_classes, kc_students, kc_dictation_rooms.
create extension if not exists pgcrypto;
create table if not exists public.kl_sessions (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references auth.users(id),
 class_id uuid references public.kc_classes(id), title text not null default 'Live-Test',
 activity text not null default 'test' check (activity in ('test','dictation')),
 exercise_url text not null, room_code text not null unique,
 duration_seconds integer not null default 1200 check(duration_seconds between 30 and 14400),
 status text not null default 'waiting' check(status in ('waiting','active','finished')),
 ends_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.kl_participants (
 id uuid primary key default gen_random_uuid(), session_id uuid not null references public.kl_sessions(id) on delete cascade,
 display_name text not null, access_token uuid not null unique default gen_random_uuid(),
 joined_at timestamptz not null default now(), submitted_at timestamptz,
 result jsonb, progress jsonb, unique(session_id,display_name)
);
create index if not exists kl_participants_session_idx on public.kl_participants(session_id);
alter table public.kl_sessions enable row level security;
alter table public.kl_participants enable row level security;
create policy kl_teacher_sessions on public.kl_sessions for all to authenticated
 using (teacher_id=auth.uid()) with check (teacher_id=auth.uid());
create policy kl_teacher_participants on public.kl_participants for select to authenticated
 using (exists(select 1 from public.kl_sessions s where s.id=session_id and s.teacher_id=auth.uid()));
-- Students use narrow RPCs, not unrestricted table access.
create or replace function public.kl_join(p_room_code text,p_name text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare s public.kl_sessions; p public.kl_participants;
begin
 select * into s from public.kl_sessions where room_code=upper(trim(p_room_code)) and status<>'finished';
 if not found then raise exception 'Room not found or finished'; end if;
 if length(trim(p_name))<2 or length(trim(p_name))>80 then raise exception 'Name must have 2-80 characters'; end if;
 insert into public.kl_participants(session_id,display_name) values(s.id,trim(p_name)) returning * into p;
 return jsonb_build_object('token',p.access_token,'participant_id',p.id,'session_id',s.id);
exception when unique_violation then raise exception 'Name already used in this room';
end $$;
create or replace function public.kl_student_state(p_token uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
declare p public.kl_participants; s public.kl_sessions;
begin
 select * into p from public.kl_participants where access_token=p_token;
 if not found then raise exception 'Invalid token'; end if;
 select * into s from public.kl_sessions where id=p.session_id;
 return jsonb_build_object('session_id',s.id,'title',s.title,'activity',s.activity,'exercise_url',s.exercise_url,
 'status',s.status,'ends_at',s.ends_at,'submitted',p.submitted_at is not null,'result',p.result);
end $$;
create or replace function public.kl_student_event(p_token uuid,p_kind text,p_payload jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare p public.kl_participants; s public.kl_sessions;
begin
 select * into p from public.kl_participants where access_token=p_token for update;
 if not found then raise exception 'Invalid token'; end if;
 select * into s from public.kl_sessions where id=p.session_id;
 if p.submitted_at is not null then return jsonb_build_object('ok',true,'already_submitted',true); end if;
 if s.status<>'active' then raise exception 'Room not active'; end if;
 if p_kind='progress' then
  update public.kl_participants set progress=p_payload where id=p.id;
 elsif p_kind='submitted' then
  update public.kl_participants set result=p_payload,submitted_at=now() where id=p.id;
 else raise exception 'Unknown event type'; end if;
 return jsonb_build_object('ok',true);
end $$;
revoke all on function public.kl_join(text,text) from public;
revoke all on function public.kl_student_state(uuid) from public;
revoke all on function public.kl_student_event(uuid,text,jsonb) from public;
grant execute on function public.kl_join(text,text) to anon,authenticated;
grant execute on function public.kl_student_state(uuid) to anon,authenticated;
grant execute on function public.kl_student_event(uuid,text,jsonb) to anon,authenticated;
-- Allow teacher monitor to receive participant changes via Supabase Realtime.
do $$ begin alter publication supabase_realtime add table public.kl_participants;
exception when duplicate_object then null; end $$;
