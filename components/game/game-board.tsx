"use client";

import { useEffect, useMemo, useState } from "react";

import { Tables } from "@/lib/utils/supabase/database.types";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timeLimitInterval, settimeLimitInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Handle card selection
  const handleCardSelect = (index: number) => {
    if (answeredQuestions.includes(index)) return;

    setSelectedCard(index);
    setShowQuestion(true);

    // Start time limit if question has a time limit set
    const questionTimeLimit = gameData.game_items[index].time_limit;
    if (questionTimeLimit) {
      setTimeRemaining(questionTimeLimit);
    } else {
      setTimeRemaining(null);
    }
  };

  // Clear time limit when component unmounts or when answer is submitted
  const cleartimeLimit = () => {
    if (timeLimitInterval) {
      clearInterval(timeLimitInterval);
      settimeLimitInterval(null);
    }
    setTimeRemaining(null);
  };

  // Start countdown time limit
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            // Auto-submit when time limit reaches 0, but use setTimeout to avoid state updates during render
            if (selectedCard !== null && !showResult) {
              setTimeout(() => {
                submitAnswer();
              }, 0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      settimeLimitInterval(interval);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, showResult]);

  // Submit answer
  const submitAnswer = () => {
    if (selectedCard === null) return;

    // Clear any active time limit
    cleartimeLimit();

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

    // Clear time limit
    cleartimeLimit();

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
              answeredQuestions.includes(index)
                ? "cursor-not-allowed opacity-50" // Style answered cards
                : "hover:scale-105"
            } relative`}
            onClick={() =>
              !answeredQuestions.includes(index) && handleCardSelect(index)
            }
            style={{ perspective: "1000px", aspectRatio: "2/3" }} // Added perspective here
          >
            {/* Inner container for flip transformation */}
            <div
              className={`relative h-full w-full transition-transform duration-700 ${
                selectedCard === index ? "rotate-y-180" : "" // Apply flip rotation
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face */}
              <div
                className={`absolute flex h-full w-full items-center justify-center rounded-lg border ${
                  answeredQuestions.includes(index)
                    ? "border-muted bg-muted/50" // Dim answered cards
                    : "border-primary bg-card"
                } p-2 shadow-md`}
                style={{
                  backfaceVisibility: "hidden", // Hide back when facing forward
                  borderRadius: "12px",
                  border: "2px solid rgba(255,255,255,0.2)",
                  backgroundImage: answeredQuestions.includes(index)
                    ? "none"
                    : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 5%, transparent 60%)",
                }}
              >
                {answeredQuestions.includes(index) ? (
                  <span className="text-4xl text-muted-foreground">✔️</span> // Larger checkmark
                ) : (
                  <>
                    <span
                      className={`absolute left-3 top-2 text-2xl font-medium`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-4xl">{cardEmojis[index]}</span>
                    <span
                      className={`absolute bottom-2 right-3 text-2xl font-medium`}
                    >
                      {index + 1}
                    </span>
                  </>
                )}
              </div>

              {/* Back Face (Initially hidden) */}
              <div
                className={`absolute flex h-full w-full items-center justify-center rounded-lg border ${
                  answeredQuestions.includes(index)
                    ? "border-muted bg-muted/50"
                    : "border-primary bg-card"
                } rotate-y-180 p-4 text-center shadow-md`} // Pre-rotated
                style={{
                  backfaceVisibility: "hidden", // Hide front when facing backward
                  borderRadius: "12px",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {answeredQuestions.includes(index) ? (
                  <span className="text-4xl text-muted-foreground">✓</span>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xl font-semibold">
                      Question {index + 1}
                    </span>
                    <span className="text-base">
                      ({item.points || 1}{" "}
                      {(item.points || 1) === 1 ? "point" : "points"})
                    </span>
                    <span className="mt-2 text-4xl">🤔</span>{" "}
                    {/* Placeholder icon */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Question Dialog (now AlertDialog) */}
      <AlertDialog open={showQuestion}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>
                Question {selectedCard !== null ? selectedCard + 1 : ""}
              </span>
              {timeRemaining !== null && (
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${timeRemaining <= 5 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                >
                  {timeRemaining}s
                </span>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCard !== null &&
                gameData.game_items[selectedCard].question}
            </AlertDialogDescription>
          </AlertDialogHeader>

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
              <AlertDialogFooter>
                <Button onClick={submitAnswer}>Submit Answer</Button>
              </AlertDialogFooter>
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
              <AlertDialogFooter>
                <Button onClick={nextTurn}>
                  {answeredQuestions.length + 1 >= gameData.game_items.length
                    ? "Finish Game"
                    : "Next Turn"}
                </Button>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
