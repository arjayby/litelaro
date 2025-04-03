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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function GameSetup({
  gameType,
  players,
  addPlayer,
  updatePlayerName,
  startGame,
  gameId,
  gameMode,
  setGameMode,
}: {
  gameType: "individual" | "group";
  players: { name: string; score: number }[];
  addPlayer: () => void;
  updatePlayerName: (index: number, name: string) => void;
  startGame: () => void;
  gameId: string;
  gameMode: "standard" | "random-redistribution";
  setGameMode: React.Dispatch<
    React.SetStateAction<"standard" | "random-redistribution">
  >;
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

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Game Mode</CardTitle>
            <CardDescription>
              Choose how points are awarded during the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={gameMode}
              onValueChange={(value) =>
                setGameMode(value as "standard" | "random-redistribution")
              }
              className="space-y-4"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="standard" className="font-medium">
                    Standard Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only the correct player earns points for right answers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value="random-redistribution"
                  id="random-redistribution"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="random-redistribution"
                    className="font-medium"
                  >
                    Random Redistribution Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Incorrect answers give points to a random opponent.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

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
    </div>
  );
}
