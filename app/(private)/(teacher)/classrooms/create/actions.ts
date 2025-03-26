"use server";

import { redirect } from "next/navigation";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { classroomSchema } from "@/lib/schemas/classroom";

export const createClassroomAction = actionClient
  .schema(classroomSchema)
  .action(async ({ parsedInput: data }) => {
    return withAuth(async ({ supabase, user }) => {
      const code = Math.random().toString(36).substring(2, 9).toUpperCase();

      const { error } = await supabase
        .from("classrooms")
        .insert({
          title: data.title,
          description: data.description,
          code,
          visibility: data.visibility,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      redirect("/classrooms");
    });
  });
