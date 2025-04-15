import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getClassroomByCode } from "@/lib/queries/classroom";
import { getClassroomStudentByIds } from "@/lib/queries/classroom-student";
import { getClassroomEmoji } from "@/lib/utils/classroom-emoji";

import { JoinClassroomForm } from "./_components/join-classroom-form";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const { supabase, user } = await getAuthSession(`/invite/${code}`);

  const classroom = await getClassroomByCode(supabase, code);

  if (!classroom) {
    notFound();
  }

  // Check if user is already a member
  const existingMembership = await getClassroomStudentByIds(
    supabase,
    classroom.id,
    user.id
  );

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h1 className="text-center font-instrument-serif text-[64px] font-normal italic leading-[83px]">
          <Link href="/">Litelaro</Link>
        </h1>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Classroom</CardTitle>
            <CardDescription>
              You&apos;ve been invited to join a classroom
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{classroom.title}</h2>
              {classroom.description && (
                <p className="text-muted-foreground">{classroom.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span className="mr-1">
                  {getClassroomEmoji.visibility(classroom.visibility).emoji}
                </span>
                {getClassroomEmoji.visibility(classroom.visibility).label}
              </div>
            </div>
          </CardContent>

          <JoinClassroomForm
            classroomId={classroom.id}
            visibility={classroom.visibility}
            existingMembership={!!existingMembership}
            isTeacher={user.user_metadata.role === "teacher"}
          />
        </Card>
      </div>
    </div>
  );
}
