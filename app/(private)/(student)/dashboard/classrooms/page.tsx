import { ClassroomList } from "@/components/classroom-list";
import { getAuthSession } from "@/lib/auth/get-auth-session";

export default async function StudentClassroomPage() {
  const { supabase } = await getAuthSession();

  const { data: classrooms } = await supabase
    .from("classroom_students")
    .select(
      `*, 
      classroom:classrooms (*, 
        students:classroom_students(count)
      )`
    )
    .order("joined_at", { ascending: false });

  return (
    <div className="container space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Classrooms</h1>
        <p className="text-muted-foreground">
          View your enrolled learning spaces
        </p>
      </div>
      <ClassroomList
        classrooms={classrooms?.map((cs) => cs.classroom) ?? []}
        role="student"
      />
    </div>
  );
}
