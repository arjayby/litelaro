"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createGameAction } from "@/app/(private)/(teacher)/motivational-games/create/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  gameCategory,
  gameDifficulty,
  GameFormValues,
  gameSchema,
  gameType,
  gameVisibility,
} from "@/lib/schemas/game";
import { cn } from "@/lib/utils";
import { getGameEmoji } from "@/lib/utils/game-emoji";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateGameFormProps {
  currentStep: number;
  onStepChange: (currentStep: number) => void;
}

export function CreateGameForm({
  currentStep,
  onStepChange,
}: CreateGameFormProps) {
  const { execute, result, hasSucceeded, isExecuting } =
    useAction(createGameAction);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Game created successfully");
    }
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  }, [hasSucceeded, result.data?.error]);

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: "",
      description: undefined,
      visibility: "public",
      type: undefined,
      difficulty: undefined,
      category: undefined,
      items: [{ question: "", answer: "", points: 1 }],
    },
  });

  function addItem() {
    const currentItems = form.getValues("items") || [];
    form.setValue("items", [
      ...currentItems,
      { question: "", answer: "", points: 1 },
    ]);
  }

  async function validateStep(step: number) {
    if (step === 0) {
      return await form.trigger(["title", "description", "visibility"]);
    }
    if (step === 1) {
      return await form.trigger(["type", "category", "difficulty"]);
    }
    return true;
  }

  async function onSubmit(data: GameFormValues) {
    execute(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentStep === 0 && "Game Information"}
          {currentStep === 1 && "Game Setup"}
          {currentStep === 2 && "Add Questions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 0: Game Information */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("title");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={gameVisibility["0"]}>
                            <div className="flex items-center gap-2">
                              <span>
                                {getGameEmoji.visibility("public").emoji}
                              </span>
                              <span>
                                {getGameEmoji.visibility("public").label}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value={gameVisibility["1"]}>
                            <div className="flex items-center gap-2">
                              <span>
                                {getGameEmoji.visibility("invite-only").emoji}
                              </span>
                              <span>
                                {getGameEmoji.visibility("invite-only").label}
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value={gameVisibility["2"]}>
                            <div className="flex items-center gap-2">
                              <span>
                                {getGameEmoji.visibility("only-me").emoji}
                              </span>
                              <span>
                                {getGameEmoji.visibility("only-me").label}
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Update step numbers for existing steps */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <FormLabel>Game Type</FormLabel>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {gameType.map((type) => (
                            <Card
                              key={type}
                              className={cn(
                                "cursor-pointer transition-colors hover:bg-accent",
                                field.value === type && "border-primary"
                              )}
                              onClick={() => {
                                field.onChange(type);
                                form.clearErrors("type");
                              }}
                            >
                              <CardHeader>
                                <CardTitle className="capitalize">
                                  {type}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">
                                  {type === "individual" &&
                                    "Play alone and challenge yourself"}
                                  {type === "group" &&
                                    "Play with friends and compete"}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Category</FormLabel>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {gameCategory.map((category) => (
                            <Card
                              key={category}
                              className={cn(
                                "cursor-pointer transition-colors hover:bg-accent",
                                field.value === category && "border-primary"
                              )}
                              onClick={() => {
                                field.onChange(category);
                                form.clearErrors("category");
                              }}
                            >
                              <CardContent className="p-4">
                                <p className="mb-1 font-medium capitalize">
                                  {category.replace(/-/g, " ")}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {category === "title-of-stories" &&
                                    "Test knowledge of story titles"}
                                  {category === "author" &&
                                    "Identify authors and their works"}
                                  {category === "periods" &&
                                    "Learn about literary periods"}
                                  {category === "epic" &&
                                    "Explore epic literature"}
                                  {category === "music" &&
                                    "Discover musical elements"}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Difficulty Level</FormLabel>
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {gameDifficulty.map((level) => (
                            <Card
                              key={level}
                              className={cn(
                                "cursor-pointer transition-colors hover:bg-accent",
                                field.value === level && "border-primary"
                              )}
                              onClick={() => {
                                field.onChange(level);
                                form.clearErrors("difficulty");
                              }}
                            >
                              <CardContent className="p-4 text-center">
                                <div className="mb-2 flex justify-center">
                                  {getGameEmoji.difficulty(level).emoji}
                                </div>
                                <p className="font-medium capitalize">
                                  {getGameEmoji.difficulty(level).label}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {level === "easy" && "Basic concepts"}
                                  {level === "average" && "Intermediate level"}
                                  {level === "difficult" && "Advanced concepts"}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Questions */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {form.watch("items").map((_, index) => (
                  <div key={index} className="space-y-4 rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question {index + 1}</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name={`items.${index}.answer`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.points`}
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel>Points</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min=""
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 1)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {form.watch("items").map((_, index) => (
                  <div key={index} className="space-y-4 rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question {index + 1}</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name={`items.${index}.answer`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.points`}
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel>Points</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 1)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => onStepChange(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <div className="flex justify-between gap-2 align-middle">
                {currentStep === 2 && (
                  <Button type="button" variant="outline" onClick={addItem}>
                    Add Question
                  </Button>
                )}
                <Button
                  type="button"
                  loading={isExecuting}
                  onClick={async () => {
                    const isValid = await validateStep(currentStep);
                    if (!isValid) return;

                    if (currentStep < 2) {
                      onStepChange(currentStep + 1);
                    } else {
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                >
                  {currentStep < 2 ? "Next" : "Create Game"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
