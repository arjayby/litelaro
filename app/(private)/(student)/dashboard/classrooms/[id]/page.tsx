import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getClassroomById } from "@/lib/queries/classroom";
import { getClassroomEmoji } from "@/lib/utils/classroom-emoji";

export default async function StudentClassroomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await getAuthSession();

  const classroom = await getClassroomById(supabase, id);

  if (!classroom) {
    notFound();
  }

  return (
    <div className="container space-y-8 p-8">
      <div className="space-y-2">
        <Button variant="ghost" size="icon">
          <Link href="/classrooms">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          {classroom.title}
        </h1>
        <p className="text-muted-foreground">
          {classroom.description || "No description provided"}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-medium">Classroom Details</h2>
        <div className="space-y-6">
          <div>
            <p className="mb-1.5 text-sm font-medium">Visibility</p>
            <div className="flex items-center gap-2 text-sm">
              {classroom.visibility === "public" ? (
                <>
                  <span>
                    {getClassroomEmoji.visibility(classroom.visibility).emoji}
                  </span>
                  <p>Public - Anyone can find and join this classroom</p>
                </>
              ) : (
                <>
                  <span>
                    {getClassroomEmoji.visibility(classroom.visibility).emoji}
                  </span>
                  <p>Invite Only - Only people with the invite code can join</p>
                </>
              )}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium">Joined</p>
            <p className="text-sm">
              {new Date(classroom.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Classmates</h2>
          <p className="text-sm text-muted-foreground">
            {classroom.students.length}{" "}
            {classroom.students.length === 1 ? "student" : "students"}
          </p>
        </div>

        {classroom.students.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {classroom.students.map((student) => (
              <div
                key={student.user.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.user.avatar_url || ""} />
                    <AvatarFallback>
                      {student.user.given_name?.[0] || ""}
                      {student.user.family_name?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {student.user.given_name} {student.user.family_name}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Joined {new Date(student.joined_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">No students have joined yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
