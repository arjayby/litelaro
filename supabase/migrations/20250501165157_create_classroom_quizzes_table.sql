create table classroom_quizzes (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references classrooms(id) on delete cascade,
  quiz_id uuid not null references quizzes(id) on delete cascade,
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(classroom_id, quiz_id)
);

-- Add RLS policies
alter table classroom_quizzes enable row level security;

-- Teachers can view quiz assignments for their classrooms
create policy "Teachers can view quiz assignments for their classrooms"
  on classroom_quizzes for select
  using (
    exists (
      select 1 from classrooms
      where id = classroom_id
      and user_id = auth.uid()
    )
  );

-- Students can view quiz assignments for their joined classrooms
create policy "Students can view quiz assignments for their joined classrooms"
  on classroom_quizzes for select
  using (
    exists (
      select 1 from classroom_students
      where classroom_id = classroom_quizzes.classroom_id
      and user_id = auth.uid()
      and status = 'approved'
    )
  );

-- Teachers can assign quizzes to their classrooms
create policy "Teachers can assign quizzes to their classrooms"
  on classroom_quizzes for insert
  with check (
    exists (
      select 1 from classrooms
      where id = classroom_id
      and user_id = auth.uid()
    )
  );

-- Teachers can remove quiz assignments from their classrooms
create policy "Teachers can remove quiz assignments from their classrooms"
  on classroom_quizzes for delete
  using (
    exists (
      select 1 from classrooms
      where id = classroom_id
      and user_id = auth.uid()
    )
  );

-- Add indexes
create index classroom_quizzes_classroom_id_idx on classroom_quizzes(classroom_id);
create index classroom_quizzes_quiz_id_idx on classroom_quizzes(quiz_id);