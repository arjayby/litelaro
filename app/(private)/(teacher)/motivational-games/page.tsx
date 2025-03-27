import { MoveRight } from "lucide-react";
import Link from "next/link";

import { GamesList } from "@/components/games-list";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/get-auth-session";
import { getAllGames } from "@/lib/queries/game";

export default async function MotivationalGamesPage() {
  const { supabase } = await getAuthSession();

  const games = await getAllGames({ supabase });

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Games</h1>
          <p className="text-muted-foreground">
            Engage with interactive learning activities
          </p>
        </div>
        <Link href="/motivational-games/create">
          <Button variant="ghost" size="lg">
            Create Game
            <MoveRight />
          </Button>
        </Link>
      </div>
      <GamesList games={games} />
    </div>
  );
}
