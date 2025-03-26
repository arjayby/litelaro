import { ClassroomCard } from "@/components/classroom-card";
import { Database } from "@/lib/utils/supabase/database.types";

type Classroom = Database["public"]["Tables"]["classrooms"]["Row"] & {
  students: { count: number }[];
};

interface ClassroomListProps {
  classrooms: Classroom[] | null;
}

export function ClassroomList({ classrooms }: ClassroomListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classrooms && classrooms.length > 0 ? (
        classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            id={classroom.id}
            title={classroom.title}
            description={classroom.description}
            visibility={classroom.visibility}
            code={classroom.code}
            studentCount={classroom.students[0]?.count ?? 0}
            createdAt={new Date(classroom.created_at)}
          />
        ))
      ) : (
        <p className="py-8 text-center text-muted-foreground md:col-span-2 lg:col-span-3">
          No classrooms created yet
        </p>
      )}
    </div>
  );
}
