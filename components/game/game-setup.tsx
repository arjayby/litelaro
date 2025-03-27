"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function GameSetup({
  gameType,
  players,
  addPlayer,
  updatePlayerName,
  startGame,
  gameId,
}: {
  gameType: "individual" | "group";
  players: { name: string; score: number }[];
  addPlayer: () => void;
  updatePlayerName: (index: number, name: string) => void;
  startGame: () => void;
  gameId: string;
}) {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon">
          <Link href={`/motivational-games/${gameId}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">🃏 Game Setup 🃏</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {gameType === "individual" ? "Player Names" : "Group Names"}
          </CardTitle>
          <CardDescription>
            Enter the names of all{" "}
            {gameType === "individual" ? "players" : "groups"} participating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`player-${index}`}>
                {gameType === "individual"
                  ? `Player ${index + 1}`
                  : `Group ${index + 1}`}
              </Label>
              <Input
                id={`player-${index}`}
                value={player.name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                placeholder={
                  gameType === "individual" ? "Player name" : "Group name"
                }
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={addPlayer}>
            Add {gameType === "individual" ? "Player" : "Group"}
          </Button>
          <Button onClick={startGame}>Start Game</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
