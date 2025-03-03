"use server";

import { redirect } from "next/navigation";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { profileSchema } from "@/lib/schemas/profile";

export const updateProfileAction = actionClient
  .schema(profileSchema)
  .action(async ({ parsedInput: { givenName, familyName, avatarUrl } }) => {
    return withAuth(async ({ supabase, user }) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          given_name: givenName,
          family_name: familyName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        return { error: error.message };
      }

      redirect("/dashboard");
    });
  });
