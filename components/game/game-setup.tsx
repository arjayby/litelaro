"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
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
  removePlayer,
  startGame,
  gameId,
  gameMode,
  setGameMode,
}: {
  gameType: "individual" | "group";
  players: { name: string; score: number }[];
  addPlayer: () => void;
  updatePlayerName: (index: number, name: string) => void;
  removePlayer: (index: number) => void;
  startGame: () => void;
  gameId: string;
  gameMode: "standard" | "random-redistribution";
  setGameMode: React.Dispatch<
    React.SetStateAction<"standard" | "random-redistribution">
  >;
}) {
  const [playerToDelete, setPlayerToDelete] = useState<number | null>(null);
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
            {players.map((player, index) => {
              return (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`player-${index}`}>
                    {gameType === "individual"
                      ? `Player ${index + 1}`
                      : `Group ${index + 1}`}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={`player-${index}`}
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      placeholder={
                        gameType === "individual" ? "Player name" : "Group name"
                      }
                      className="flex-1"
                    />
                    {players.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setPlayerToDelete(index)}
                          className="flex-shrink-0"
                          aria-label={`Delete ${gameType === "individual" ? "player" : "group"}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={addPlayer}>
              Add {gameType === "individual" ? "Player" : "Group"}
            </Button>
            <Button onClick={startGame}>Start Game</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Alert Dialog for player deletion */}
      <AlertDialog
        open={playerToDelete !== null}
        onOpenChange={(open) => !open && setPlayerToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {gameType === "individual" ? "Player" : "Group"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {playerToDelete !== null && players[playerToDelete]?.name
                ? players[playerToDelete].name
                : gameType === "individual"
                  ? "this player"
                  : "this group"}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (playerToDelete !== null) {
                  removePlayer(playerToDelete);
                  setPlayerToDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
