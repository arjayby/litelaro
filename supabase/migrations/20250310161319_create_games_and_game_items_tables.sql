-- Create types
create type game_visibility as enum ('public', 'invite-only', 'only-me');
create type game_type as enum ('individual', 'group');
create type game_difficulty as enum ('easy', 'average', 'difficult');
create type game_category as enum ('title-of-stories', 'author', 'periods', 'epic', 'music');

-- Create games table
create table games (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  visibility game_visibility not null default 'public',
  type game_type not null,
  difficulty game_difficulty not null,
  category game_category not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid not null references auth.users(id) on delete cascade
);

-- Create game_items table
create table game_items (
  id uuid default gen_random_uuid() primary key,
  game_id uuid not null references games(id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table games enable row level security;
alter table game_items enable row level security;

-- Updated policies for games
create policy "Users can view public games"
  on games for select
  using (visibility = 'public');

create policy "Users can view their own games"
  on games for select
  using (user_id = auth.uid());

create policy "Users can create games"
  on games for insert
  with check (user_id = auth.uid());

create policy "Users can update their own games"
  on games for update
  using (user_id = auth.uid());

create policy "Users can delete their own games"
  on games for delete
  using (user_id = auth.uid());

-- Game items policies
create policy "Users can view game items of public games"
  on game_items for select
  using (
    exists (
      select 1 from games
      where id = game_items.game_id
      and visibility = 'public'
    )
  );

create policy "Users can view their own game items"
  on game_items for select
  using (
    exists (
      select 1 from games
      where id = game_items.game_id
      and user_id = auth.uid()
    )
  );

create policy "Users can create game items for their games"
  on game_items for insert
  with check (
    exists (
      select 1 from games
      where id = game_items.game_id
      and user_id = auth.uid()
    )
  );

create policy "Users can update their own game items"
  on game_items for update
  using (
    exists (
      select 1 from games
      where id = game_items.game_id
      and user_id = auth.uid()
    )
  );

create policy "Users can delete their own game items"
  on game_items for delete
  using (
    exists (
      select 1 from games
      where id = game_items.game_id
      and user_id = auth.uid()
    )
  );

-- Create indexes
create index games_user_id_idx on games(user_id);
create index games_visibility_idx on games(visibility);
create index game_items_game_id_idx on game_items(game_id);

-- Add updated_at trigger
create trigger handle_updated_at before update on games
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on game_items
  for each row execute procedure moddatetime (updated_at);