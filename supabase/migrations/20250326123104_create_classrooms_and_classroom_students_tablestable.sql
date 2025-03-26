create type classroom_visibility as enum ('public', 'invite-only');
create type classroom_student_status as enum ('pending', 'approved', 'rejected');

create table classrooms (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  code text not null unique,
  visibility classroom_visibility not null default 'invite-only',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete cascade not null
);

create table classroom_students (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid references classrooms(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  status classroom_student_status not null default 'pending',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(classroom_id, user_id)
);

-- Add RLS policies
alter table classrooms enable row level security;
alter table classroom_students enable row level security;

-- Classroom policies
create policy "Anyone can view classrooms"
  on classrooms for select
  using (true);

create policy "Users can create their own classrooms"
  on classrooms for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own classrooms"
  on classrooms for update
  using (auth.uid() = user_id);

create policy "Users can delete their own classrooms"
  on classrooms for delete
  using (auth.uid() = user_id);

-- Classroom students policies
create policy "Teachers can view their classroom students"
  on classroom_students for select
  using (
    exists (
      select 1 from classrooms
      where id = classroom_id
      and user_id = auth.uid()
    )
  );

create policy "Students can view their own classroom memberships"
  on classroom_students for select
  using (user_id = auth.uid());

create policy "Students can join classrooms"
  on classroom_students for insert
  with check (auth.uid() = user_id);

create policy "Teachers can update student status"
  on classroom_students for update
  using (
    exists (
      select 1 from classrooms
      where id = classroom_id
      and user_id = auth.uid()
    )
  );

-- Auto-approve students for public classrooms
create or replace function auto_approve_public_classroom_students()
returns trigger as $$
begin
  if exists (
    select 1 from classrooms
    where id = NEW.classroom_id
    and visibility = 'public'
  ) then
    NEW.status := 'approved';
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger auto_approve_public_classroom_students
  before insert on classroom_students
  for each row execute procedure auto_approve_public_classroom_students();

create trigger handle_updated_at before update on classrooms
  for each row execute procedure moddatetime (updated_at);

-- Add indexes
create index classrooms_user_id_idx on classrooms(user_id);
create index classrooms_code_idx on classrooms(code);
create index classroom_students_classroom_id_idx on classroom_students(classroom_id);
create index classroom_students_user_id_idx on classroom_students(user_id);
create index classroom_students_status_idx on classroom_students(status);