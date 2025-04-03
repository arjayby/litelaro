"use client";

import { useMemo, useState } from "react";

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
  gameMode,
}: {
  gameData: Tables<"games"> & {
    game_items: Tables<"game_items">[];
  };
  players: { name: string; score: number }[];
  setPlayers: React.Dispatch<
    React.SetStateAction<{ name: string; score: number }[]>
  >;
  onGameFinish: () => void;
  gameMode: "standard" | "random-redistribution";
}) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [receivingPlayerIndex, setReceivingPlayerIndex] = useState<
    number | null
  >(null);

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

    // Get points for the question (default to 1 if not specified)
    const pointsForQuestion = question.points || 1;

    const newPlayers = [...players];

    // Reset the receiving player index
    setReceivingPlayerIndex(null);

    if (correct) {
      // Add points to current player when correct
      newPlayers[currentPlayerIndex] = {
        ...newPlayers[currentPlayerIndex],
        score: newPlayers[currentPlayerIndex].score + pointsForQuestion,
      };
    } else if (gameMode === "random-redistribution" && players.length > 1) {
      // In random redistribution mode, give points to a random opponent
      // Generate random player index that is not the current player
      let randomPlayerIndex;
      do {
        randomPlayerIndex = Math.floor(Math.random() * players.length);
      } while (randomPlayerIndex === currentPlayerIndex);

      // Add points to the random player
      newPlayers[randomPlayerIndex] = {
        ...newPlayers[randomPlayerIndex],
        score: newPlayers[randomPlayerIndex].score + pointsForQuestion,
      };

      // Store the player who received the points
      setReceivingPlayerIndex(randomPlayerIndex);
    }

    setPlayers(newPlayers);
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

  // Create a mapping of card indices to emojis
  const cardEmojis = useMemo(() => {
    const emojis = [
      "🚀",
      "🎮",
      "🎯",
      "🧩",
      "🎪",
      "🎨",
      "🎭",
      "🎲",
      "🦄",
      "🎡",
      "🎢",
      "🎠",
      "🎬",
      "🎤",
      "🎧",
      "🎵",
      "🎸",
      "🎹",
      "🎺",
      "🎻",
      "🌈",
      "⭐",
      "🔮",
      "💎",
      "🧸",
      "🦊",
      "🐙",
      "🦁",
      "🐳",
      "🦋",
      "🍕",
      "🍦",
      "🍩",
      "🍓",
      "🥑",
      "🌮",
      "🍔",
      "🍟",
      "🧠",
      "❤️",
      "🌟",
      "🌞",
      "🌙",
      "⚡",
      "🔥",
      "💧",
      "🌪️",
      "🌵",
      "🌴",
      "🏝️",
    ];

    // Shuffle the emojis array to ensure randomness
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);

    return gameData.game_items.map((_, i) => shuffled[i % shuffled.length]);
  }, [gameData.game_items]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{gameData.title}</h1>
        <div className="text-center text-lg font-medium">
          <span className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
            {gameMode === "standard"
              ? "Standard Mode"
              : "Random Redistribution Mode"}
          </span>
        </div>
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
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {gameData.game_items.map((item, index: number) => (
          <div
            key={index}
            className={`flex cursor-pointer items-center justify-center rounded-lg text-3xl font-bold shadow-md transition-all hover:shadow-lg ${
              answeredQuestions.includes(index) ? "" : "hover:scale-105"
            } relative`}
            onClick={() =>
              !answeredQuestions.includes(index) && handleCardSelect(index)
            }
            style={{ perspective: "1000px", aspectRatio: "2/3" }}
          >
            <div
              className={`h-full w-full rounded-lg border ${
                answeredQuestions.includes(index)
                  ? "border-muted"
                  : "border-primary"
              } absolute flex items-center justify-center transition-all duration-500 ${
                selectedCard === index && showQuestion
                  ? "animate-card-flip"
                  : ""
              } bg-card p-2 shadow-md`}
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                borderRadius: "12px",
                border: "2px solid rgba(255,255,255,0.2)",
                backgroundImage: answeredQuestions.includes(index)
                  ? "none"
                  : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 5%, transparent 60%)",
              }}
            >
              {answeredQuestions.includes(index) ? (
                "✓"
              ) : (
                <>
                  <span
                    className={`absolute left-3 top-2 text-2xl font-medium transition-opacity duration-500 ${
                      selectedCard === index && showQuestion ? "opacity-0" : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-3xl">{cardEmojis[index]}</span>
                  <span
                    className={`absolute bottom-2 right-3 rotate-180 text-2xl font-medium transition-opacity duration-500 ${
                      selectedCard === index && showQuestion ? "opacity-0" : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Question Dialog */}
      <Dialog open={showQuestion} onOpenChange={setShowQuestion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                Question {selectedCard !== null ? selectedCard + 1 : ""}
              </span>
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
                {selectedCard !== null && (
                  <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Points:{" "}
                    <span className="font-bold">
                      {gameData.game_items[selectedCard].points || 1}
                    </span>
                  </span>
                )}
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
                  {selectedCard !== null && (
                    <p className="mt-2 text-sm">
                      {isCorrect ? (
                        `${players[currentPlayerIndex].name} earned `
                      ) : gameMode === "random-redistribution" &&
                        players.length > 1 ? (
                        <span>
                          <span className="font-bold">
                            {gameData.game_items[selectedCard].points || 1}
                          </span>
                          {` ${(gameData.game_items[selectedCard].points || 1) === 1 ? "point" : "points"} were randomly given to ${receivingPlayerIndex !== null ? players[receivingPlayerIndex].name : "an opponent"}!`}
                        </span>
                      ) : (
                        "No points awarded."
                      )}
                      {isCorrect && (
                        <span>
                          <span className="font-bold">
                            {gameData.game_items[selectedCard].points || 1}
                          </span>
                          {` ${(gameData.game_items[selectedCard].points || 1) === 1 ? "point" : "points"}!`}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={nextTurn}>
                  {answeredQuestions.length + 1 >= gameData.game_items.length
                    ? "Finish Game"
                    : "Next Turn"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
