"use server";

import { redirect } from "next/navigation";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { profileSchema } from "@/lib/schemas/profile";

export const completeProfileAction = actionClient
  .schema(profileSchema)
  .action(
    async ({ parsedInput: { givenName, familyName, role, avatarUrl } }) => {
      return withAuth(async ({ supabase, user }) => {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: user.id,
          given_name: givenName,
          family_name: familyName,
          role: role,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          return { error: profileError.message };
        }

        // Only store the data that are not changeable
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            is_profile_completed: true,
            role: role,
          },
        });

        if (metadataError) {
          return { error: metadataError.message };
        }

        // Refresh session to update the metadata
        await supabase.auth.refreshSession();

        redirect("/dashboard");
      });
    }
  );
