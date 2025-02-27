"use server";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { profileSchema } from "@/lib/schemas/profile";

export const completeProfileAction = actionClient
  .schema(profileSchema)
  .action(async ({ parsedInput: { givenName, familyName, role } }) => {
    return withAuth(async ({ supabase, session }) => {
      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        given_name: givenName,
        family_name: familyName,
        role: role,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        return { error: error.message };
      }
    });
  });
