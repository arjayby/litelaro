create table profiles (
  id uuid references auth.users on delete cascade primary key,
  given_name text not null,
  family_name text not null,
  role text not null check (role in ('student', 'teacher')),
  updated_at timestamp with time zone not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS (Row Level Security)
alter table profiles enable row level security;

-- Create policy to allow users to read their own profile
create policy "Users can read own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Create policy to allow users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create policy to allow users to insert their own profile
create policy "Users can insert own profile"
  on profiles for insert
  with check ( auth.uid() = id );