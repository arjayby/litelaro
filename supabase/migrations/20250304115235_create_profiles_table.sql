-- Create the moddatetime extension if it doesn't exist
create extension if not exists moddatetime schema extensions;

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  given_name text not null,
  family_name text not null,
  role text not null check (role in ('student', 'teacher')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table profiles enable row level security;

-- Create policy to allow users to read their own profile
create policy "Users can read own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Create policy to allow users to update their own profile except role
create policy "Users can update own profile except role"
  on profiles 
  for update using (
    auth.uid() = id
  )
  with check (
    role = (select role from profiles where id = auth.uid())
  );

-- Create policy to allow users to insert their own profile
create policy "Users can insert own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Add updated_at trigger
create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);