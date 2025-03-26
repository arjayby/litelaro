-- Create a helper function to get user role without recursion
create or replace function get_user_role(user_id uuid)
returns text
language sql
security definer
stable
as $$
  select role from profiles where id = user_id;
$$;

-- Drop the existing policy that causes recursion
drop policy if exists "Users can update own profile except role" on profiles;

-- Create updated policy using the helper function
create policy "Users can update own profile except role"
  on profiles 
  for update using (
    auth.uid() = id
  )
  with check (
    role = get_user_role(auth.uid())
  );