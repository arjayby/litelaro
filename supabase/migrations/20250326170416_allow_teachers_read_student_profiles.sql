CREATE POLICY "Teachers can read student profiles"
ON profiles
FOR SELECT
USING (
  id IN (
    SELECT classroom_students.user_id
    FROM classroom_students
    JOIN classrooms ON classrooms.id = classroom_students.classroom_id
    WHERE classrooms.user_id = auth.uid()
  )
);
