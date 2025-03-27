import { Database } from "@/lib/utils/supabase/database.types";

import { GameCard } from "./game-card";

type Game = Database["public"]["Tables"]["games"]["Row"];
export function GamesList({ games }: { games: Game[] }) {
  if (!games || games.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No games found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard
          key={game.id}
          {...game}
          createdAt={new Date(game.created_at)}
        />
      ))}
    </div>
  );
}
