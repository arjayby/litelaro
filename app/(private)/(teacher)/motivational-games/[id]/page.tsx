import { notFound } from "next/navigation";

import { GameDetails } from "@/components/game/game-details";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getGameById } from "@/lib/queries/game";

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await getAuthSession();

  const game = await getGameById({ supabase }, id);

  if (!game) {
    notFound();
  }

  return (
    <div className="container space-y-8 p-8">
      <GameDetails game={game} />
    </div>
  );
}
