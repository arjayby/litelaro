"use server";

import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth/get-auth-session";

const actionClient = createSafeActionClient();

const joinClassroomSchema = z.object({
  classroomId: z.string().uuid(),
});

export const joinClassroomAction = actionClient
  .schema(joinClassroomSchema)
  .action(async ({ parsedInput: { classroomId } }) => {
    const { supabase, user } = await getAuthSession();

    if (!user) {
      return { error: "You must be logged in to join a classroom" };
    }

    if (user.user_metadata.role !== "student") {
      return { error: "Only students can join classrooms" };
    }

    const { error } = await supabase.from("classroom_students").insert({
      classroom_id: classroomId,
      user_id: user.id,
    });

    if (error) {
      return { error: error.message };
    }

    return redirect(`/classrooms/${classroomId}`);
  });
