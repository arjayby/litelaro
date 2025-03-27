"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Tables } from "@/lib/utils/supabase/database.types";

import { GameBoard } from "./game-board";
import { GameResults } from "./game-results";
import { GameSetup } from "./game-setup";

interface GamePlayProps {
  game: Tables<"games"> & {
    game_items: Tables<"game_items">[];
  };
}

export function GamePlay({ game }: GamePlayProps) {
  const router = useRouter();
  const [gameState, setGameState] = useState<"setup" | "playing" | "finished">(
    "setup"
  );
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([
    { name: "", score: 0 },
  ]);

  const addPlayer = () => {
    setPlayers([...players, { name: "", score: 0 }]);
  };

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const startGame = () => {
    if (players.some((player) => !player.name.trim())) {
      alert("All players must have names");
      return;
    }
    setGameState("playing");
  };

  return (
    <div className="container p-8">
      {gameState === "setup" && (
        <GameSetup
          gameType={game.type}
          players={players}
          addPlayer={addPlayer}
          updatePlayerName={updatePlayerName}
          startGame={startGame}
          gameId={game.id}
        />
      )}

      {gameState === "playing" && (
        <GameBoard
          gameData={game}
          players={players}
          setPlayers={setPlayers}
          onGameFinish={() => setGameState("finished")}
        />
      )}

      {gameState === "finished" && (
        <GameResults
          players={players}
          onPlayAgain={() => {
            setPlayers(players.map((p) => ({ ...p, score: 0 })));
            setGameState("playing");
          }}
          onExit={() => router.push(`/motivational-games/${game.id}`)}
        />
      )}
    </div>
  );
}
