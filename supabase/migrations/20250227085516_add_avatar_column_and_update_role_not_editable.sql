-- Add avatar_url column
alter table profiles
  add column avatar_url text;

-- Drop the old update policy
drop policy "Users can update own profile" on profiles;

-- Create new policy to allow users to update their own profile except role
create policy "Users can update own profile except role"
  on profiles 
  for update using (
    auth.uid() = id
  )
  with check (
    role = (select role from profiles where id = auth.uid())
  );