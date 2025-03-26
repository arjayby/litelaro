import { MoveRight } from "lucide-react";
import Link from "next/link";

import { ClassroomList } from "@/components/classroom-list";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/get-auth-session";

export default async function ClassroomPage() {
  const { supabase } = await getAuthSession();

  const { data: classrooms } = await supabase
    .from("classrooms")
    .select("*, students:classroom_students(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
          <p className="text-muted-foreground">
            Manage your virtual learning spaces
          </p>
        </div>
        <Link href="/classrooms/create">
          <Button variant="ghost" size="lg">
            Create Classroom
            <MoveRight />
          </Button>
        </Link>
      </div>
      <ClassroomList classrooms={classrooms} />
    </div>
  );
}
