import { GameCard } from "@/components/game-card";
import { Database } from "@/lib/utils/supabase/database.types";

type Game = Database["public"]["Tables"]["games"]["Row"];

interface GamesListProps {
  games: Game[] | null;
}

export function GamesList({ games }: GamesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {games && games.length > 0 ? (
        games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            createdAt={new Date(game.created_at)}
          />
        ))
      ) : (
        <p className="py-8 text-center text-muted-foreground md:col-span-2 lg:col-span-3">
          No games found. Create your first game!
        </p>
      )}
    </div>
  );
}
