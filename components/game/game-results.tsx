"use client";

import { Button } from "../ui/button";

export function GameResults({
  players,
  onPlayAgain,
  onExit,
  gameMode,
}: {
  players: { name: string; score: number }[];
  onPlayAgain: () => void;
  onExit: () => void;
  gameMode: "standard" | "random-redistribution";
}) {
  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Get medal emoji based on position
  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-8">
      <h1 className="text-center text-3xl font-bold">Game Results</h1>
      <p className="mb-4 text-center text-muted-foreground">
        Game Mode:{" "}
        {gameMode === "standard" ? "Standard" : "Random Redistribution"}
      </p>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Leaderboard</h2>

        <div className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg p-3 ${
                index < 3 ? "bg-muted/50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{getMedal(index)}</span>
                <span className="font-medium">{player.name}</span>
              </div>
              <span className="text-lg font-bold">{player.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button onClick={onExit}>Exit Game</Button>
      </div>
    </div>
  );
}
