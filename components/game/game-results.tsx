"use client";

import { useEffect } from "react";
import { useReward } from "react-rewards";
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

  const { reward: confettiReward } = useReward(
    "leaderboardConfetti",
    "confetti",
    {
      lifetime: 200,
      spread: 90,
      elementCount: 80,
      startVelocity: 35,
    }
  );

  // Trigger confetti when the results are shown
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < 3; i++) {
      timeouts.push(
        setTimeout(() => {
          confettiReward();
        }, i * 3000)
      );
    }

    // Cleanup function to clear timeouts if the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

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
      {/* Confetti anchor - positioned fixed to center on screen */}
      <span
        id="leaderboardConfetti"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 9999 }} // Ensure it's above other elements if needed
      />
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
        {/* Buttons remain here, anchor is now independent */}
        <Button variant="outline" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button onClick={onExit}>Exit Game</Button>
      </div>
    </div>
  );
}
