"use server";

import { redirect } from "next/navigation";

import { withAuth } from "@/lib/auth/with-auth";
import { actionClient } from "@/lib/safe-action";
import { gameSchema } from "@/lib/schemas/game";

export const createGameAction = actionClient
  .schema(gameSchema)
  .action(async ({ parsedInput: data }) => {
    return withAuth(async ({ supabase, user }) => {
      const { data: game, error: gameError } = await supabase
        .from("games")
        .insert({
          title: data.title,
          description: data.description,
          visibility: data.visibility,
          type: data.type,
          difficulty: data.difficulty,
          category: data.category,
          user_id: user.id,
        })
        .select()
        .single();

      if (gameError) {
        console.log("game error", gameError);
        return { error: gameError.message };
      }

      const { error: itemsError } = await supabase.from("game_items").insert(
        data.items.map((item) => ({
          game_id: game.id,
          question: item.question,
          answer: item.answer,
        }))
      );

      if (itemsError) {
        console.log("items error", itemsError);
        return { error: itemsError.message };
      }

      redirect("/games");
    });
  });
