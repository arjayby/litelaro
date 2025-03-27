import { Clock, Users } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGameEmoji } from "@/lib/utils/game-emoji";

interface GameCardProps {
  id: string;
  title: string;
  description?: string | null;
  type: "individual" | "group";
  difficulty: "easy" | "average" | "difficult";
  visibility: "public" | "invite-only" | "only-me";
  category: string;
  createdAt: Date;
  totalPlayers?: number;
}

export function GameCard({
  id,
  title,
  description,
  type,
  difficulty,
  category,
  visibility,
  createdAt,
  totalPlayers = 0,
}: GameCardProps) {
  return (
    <Link href={`/motivational-games/${id}`}>
      <Card className="transition-colors hover:bg-accent">
        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description || "No description provided"}
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span className="capitalize">{type}</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span className="capitalize">
                  {category.replace(/-/g, " ")}
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span>{getGameEmoji.difficulty(difficulty).emoji}</span>
                <span className="capitalize">{difficulty}</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span>{getGameEmoji.visibility(visibility).emoji}</span>
                <span>{getGameEmoji.visibility(visibility).label}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{totalPlayers}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
