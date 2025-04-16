create table student_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  score integer not null,
  answers jsonb not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint student_quiz_attempts_answers_check check (
    jsonb_array_length(answers) > 0 and
    jsonb_typeof(answers) = 'array'
  )
);

alter table student_quiz_attempts enable row level security;

create policy "Students can view their own quiz attempts"
  on student_quiz_attempts for select
  using (student_id = auth.uid());

create policy "Students can create quiz attempts"
  on student_quiz_attempts for insert
  with check (student_id = auth.uid());

create unique index student_quiz_attempts_student_quiz_idx on student_quiz_attempts(student_id, quiz_id);