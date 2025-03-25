"use server";

import { redirect } from "next/navigation";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { quizSchema } from "@/lib/schemas/quiz";

export const createQuizAction = actionClient
  .schema(quizSchema)
  .action(async ({ parsedInput: data }) => {
    return withAuth(async ({ supabase, user }) => {
      const { data: quiz, error: quizError } = await supabase
        .from("quizzes")
        .insert({
          title: data.title,
          description: data.description,
          visibility: data.visibility,
          type: data.type,
          difficulty: data.difficulty,
          user_id: user.id,
        })
        .select()
        .single();

      if (quizError) {
        return { error: quizError.message };
      }

      const { error: itemsError } = await supabase.from("quiz_items").insert(
        data.items.map((item) => ({
          quiz_id: quiz.id,
          question: item.question,
          choices: item.choices,
        }))
      );

      if (itemsError) {
        return { error: itemsError.message };
      }

      redirect("/quizzes");
    });
  });
