import { notFound } from "next/navigation";

import { GamePlay } from "@/components/game/game-play";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getGameByIdWithGameItems } from "@/lib/queries/game";

export default async function GamePlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await getAuthSession();
  const game = await getGameByIdWithGameItems({ supabase }, id);

  if (!game) {
    notFound();
  }

  return <GamePlay game={game} />;
}
