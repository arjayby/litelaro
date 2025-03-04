create type quiz_visibility as enum ('public', 'invite-only', 'only-me');
create type quiz_type as enum ('subject', 'topic', 'questions');
create type quiz_difficulty as enum ('easy', 'average', 'difficult');

create table quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  visibility quiz_visibility not null default 'public',
  type quiz_type not null,
  difficulty quiz_difficulty,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint quizzes_difficulty_check check (
    (type = 'questions' and difficulty is not null) or
    (type != 'questions' and difficulty is null)
  )
);

create table quiz_items (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  question text not null,
  choices jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint quiz_items_choices_check check (
    jsonb_array_length(choices) = 4 and
    jsonb_array_length(jsonb_path_query_array(choices, '$[*] ? (@.isCorrect == true)')) = 1
  )
);

-- Add RLS policies
alter table quizzes enable row level security;
alter table quiz_items enable row level security;

-- Policies for quizzes
create policy "Users can view public quizzes"
  on quizzes for select
  using (visibility = 'public');

create policy "Users can view their own quizzes"
  on quizzes for select
  using (user_id = auth.uid());

create policy "Users can create quizzes"
  on quizzes for insert
  with check (user_id = auth.uid());

create policy "Users can update their own quizzes"
  on quizzes for update
  using (user_id = auth.uid());

create policy "Users can delete their own quizzes"
  on quizzes for delete
  using (user_id = auth.uid());

-- Policies for quiz items
create policy "Users can view quiz items of public quizzes"
  on quiz_items for select
  using (
    exists (
      select 1 from quizzes
      where id = quiz_items.quiz_id
      and visibility = 'public'
    )
  );

create policy "Users can view their own quiz items"
  on quiz_items for select
  using (
    exists (
      select 1 from quizzes
      where id = quiz_items.quiz_id
      and user_id = auth.uid()
    )
  );

create policy "Users can create quiz items for their quizzes"
  on quiz_items for insert
  with check (
    exists (
      select 1 from quizzes
      where id = quiz_items.quiz_id
      and user_id = auth.uid()
    )
  );

create policy "Users can update their own quiz items"
  on quiz_items for update
  using (
    exists (
      select 1 from quizzes
      where id = quiz_items.quiz_id
      and user_id = auth.uid()
    )
  );

create policy "Users can delete their own quiz items"
  on quiz_items for delete
  using (
    exists (
      select 1 from quizzes
      where id = quiz_items.quiz_id
      and user_id = auth.uid()
    )
  );

-- Add updated_at trigger
create trigger handle_updated_at before update on quizzes
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on quiz_items
  for each row execute procedure moddatetime (updated_at);