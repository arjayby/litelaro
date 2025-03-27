import { Calendar, Play, User } from "lucide-react";
import Link from "next/link";

import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { getGameEmoji } from "@/lib/utils/game-emoji";
import { Tables } from "@/lib/utils/supabase/database.types";

import { Button } from "../ui/button";

interface GameDetailsProps {
  game: Tables<"games"> & {
    profiles?: {
      given_name: string;
      family_name: string;
    } | null;
  };
}

export function GameDetails({ game }: GameDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Left column - Image */}
      <div className="relative overflow-hidden rounded-lg border">
        <PlaceholderImage title={game.title} />
      </div>

      {/* Right column - Game details */}
      <div className="space-y-6 md:col-span-2">
        <div>
          <h1 className="text-3xl font-bold">{game.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {game.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span className="capitalize">
              {game.category.replace(/-/g, " ")}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span className="capitalize">{game.type}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span>{getGameEmoji.difficulty(game.difficulty).emoji}</span>
            <span className="capitalize">{game.difficulty}</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
            <span>{getGameEmoji.visibility(game.visibility).emoji}</span>
            <span>{getGameEmoji.visibility(game.visibility).label}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(game.created_at))}
            </span>
          </div>
          {game.profiles && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>
                By {game.profiles.given_name} {game.profiles.family_name}
              </span>
            </div>
          )}
        </div>

        <div className="flex pt-8">
          <Link href={`/motivational-games/${game.id}/play`}>
            <Button size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Play Game
            </Button>
          </Link>
        </div>
        {/* <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-xl font-semibold">
            Game Items ({game.game_items.length})
          </h2>
          <div className="space-y-4">
            {game.game_items.map((item, index) => (
              <div key={item.id} className="rounded-md border p-3">
                <p className="font-medium">
                  {index + 1}. {item.question}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Answer: <span className="font-medium">{item.answer}</span>
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
