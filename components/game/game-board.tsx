"use client";

import { useState } from "react";

import { Tables } from "@/lib/utils/supabase/database.types";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function GameBoard({
  gameData,
  players,
  setPlayers,
  onGameFinish,
}: {
  gameData: Tables<"games"> & {
    game_items: Tables<"game_items">[];
  };
  players: { name: string; score: number }[];
  setPlayers: React.Dispatch<
    React.SetStateAction<{ name: string; score: number }[]>
  >;
  onGameFinish: () => void;
}) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  // Handle card selection
  const handleCardSelect = (index: number) => {
    if (answeredQuestions.includes(index)) return;

    setSelectedCard(index);
    setShowQuestion(true);
  };

  // Submit answer
  const submitAnswer = () => {
    if (selectedCard === null) return;

    const question = gameData.game_items[selectedCard];
    if (!question) return;

    // Compare answers case-insensitive and trimmed
    const correct =
      answer.trim().toLowerCase() === question.answer.trim().toLowerCase();

    setIsCorrect(correct);
    setShowResult(true);

    // Only add 1 point when correct - using a more direct approach
    if (correct) {
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex] = {
        ...newPlayers[currentPlayerIndex],
        score: newPlayers[currentPlayerIndex].score + 1,
      };
      setPlayers(newPlayers);
    }
  };

  // Next turn
  const nextTurn = () => {
    if (selectedCard !== null) {
      setAnsweredQuestions([...answeredQuestions, selectedCard]);
    }

    setSelectedCard(null);
    setShowQuestion(false);
    setShowResult(false);
    setAnswer("");

    // Check if game is finished
    if (answeredQuestions.length + 1 >= gameData.game_items.length) {
      onGameFinish();
      return;
    }

    // Next player's turn
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{gameData.title}</h1>
        <div className="text-lg font-medium">
          Current Turn:{" "}
          <span className="text-primary">
            {players[currentPlayerIndex].name}
          </span>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {players.map((player, index) => (
          <Card
            key={index}
            className={currentPlayerIndex === index ? "border-primary" : ""}
          >
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between text-base">
                {player.name}
                {currentPlayerIndex === index && (
                  <span className="text-primary">🎮</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{player.score}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {gameData.game_items.map((item, index: number) => (
          <div
            key={index}
            className={`aspect-square cursor-pointer rounded-lg border-2 ${
              answeredQuestions.includes(index)
                ? "border-muted bg-muted/50"
                : "border-primary bg-card"
            } flex items-center justify-center text-2xl font-bold transition-all hover:scale-105`}
            onClick={() =>
              !answeredQuestions.includes(index) && handleCardSelect(index)
            }
          >
            {answeredQuestions.includes(index) ? "✓" : index + 1}
          </div>
        ))}
      </div>

      {/* Question Dialog */}
      <Dialog open={showQuestion} onOpenChange={setShowQuestion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Question {selectedCard !== null ? selectedCard + 1 : ""}
            </DialogTitle>
            <DialogDescription>
              {selectedCard !== null &&
                gameData.game_items[selectedCard].question}
            </DialogDescription>
          </DialogHeader>

          {!showResult ? (
            <>
              <div className="grid gap-4 py-4">
                <Label htmlFor="answer">Your Answer</Label>
                <Input
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here"
                />
              </div>
              <DialogFooter>
                <Button onClick={submitAnswer}>Submit Answer</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div
                  className={`rounded-lg p-4 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}
                >
                  <p className="font-medium">
                    {isCorrect ? "Correct! 🎉" : "Incorrect ❌"}
                  </p>
                  <p className="mt-2">
                    The correct answer is:{" "}
                    <span className="font-bold">
                      {selectedCard !== null &&
                        gameData.game_items[selectedCard].answer}
                    </span>
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={nextTurn}>Next Turn</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
