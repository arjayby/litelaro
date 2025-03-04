"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createQuizAction } from "@/app/quizzes/create/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  quizDifficulty,
  QuizFormValues,
  quizSchema,
  quizType,
  quizVisibility,
} from "@/lib/schemas/quiz";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateQuizFormProps {
  currentStep: number;
  onStepChange: (currentStep: number) => void;
}

export function CreateQuizForm({
  currentStep,
  onStepChange,
}: CreateQuizFormProps) {
  const { execute, result, hasSucceeded, isExecuting } =
    useAction(createQuizAction);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Quiz created successfully");
    }
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  }, [hasSucceeded, result.data?.error]);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: undefined,
      difficulty: undefined,
      type: undefined,
      visibility: "public",
      items: [
        {
          question: "",
          choices: Array(4).fill({ text: "", isCorrect: false }),
        },
      ],
    },
  });

  function addItem() {
    const currentItems = form.getValues("items") || [];
    form.setValue("items", [
      ...currentItems,
      {
        question: "",
        choices: Array(4).fill({ text: "", isCorrect: false }),
      },
    ]);
  }

  async function validateStep(step: number) {
    if (step === 0) {
      const result = await form.trigger("title");
      return result;
    }
    if (step === 1) {
      const typeResult = await form.trigger("type");
      if (!typeResult) return false;

      if (form.watch("type") === "questions") {
        const difficultyResult = await form.trigger("difficulty");
        return difficultyResult;
      }
      return true;
    }
    return true;
  }

  async function onSubmit(data: QuizFormValues) {
    execute(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentStep === 0 && "Quiz Information"}
          {currentStep === 1 && "Choose Quiz Type"}
          {currentStep === 2 && "Add Questions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 0 */}
            {currentStep === 0 && (
              <div className="space-y-4">
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
                      <FormItem className="space-y-1">
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
                            <SelectItem value={quizVisibility["0"]}>
                              <div className="flex items-center gap-2">
                                <span>🌍</span>
                                <span>Public</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={quizVisibility["1"]}>
                              <div className="flex items-center gap-2">
                                <span>👥</span>
                                <span>Invite Only</span>
                              </div>
                            </SelectItem>
                            <SelectItem value={quizVisibility["2"]}>
                              <div className="flex items-center gap-2">
                                <span>🔒</span>
                                <span>Only Me</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {field.value === "public" &&
                            "Anyone can view and take this quiz"}
                          {field.value === "invite-only" &&
                            "Only users with an invite link can access this quiz"}
                          {field.value === "only-me" &&
                            "Only you can view and manage this quiz"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {quizType.map((type) => (
                          <Card
                            key={type}
                            className={cn(
                              "cursor-pointer transition-colors hover:bg-accent",
                              field.value === type && "border-primary"
                            )}
                            onClick={() => {
                              field.onChange(type);
                              form.clearErrors("type");
                              // Reset difficulty when changing quiz type
                              if (type !== "questions") {
                                form.setValue("difficulty", undefined);
                              }
                            }}
                          >
                            <CardHeader>
                              <CardTitle className="capitalize">
                                {type}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {type === "subject" &&
                                  "Create a subject-based quiz"}
                                {type === "topic" &&
                                  "Create a topic-based quiz"}
                                {type === "questions" &&
                                  "Create a questions-based quiz"}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("type") === "questions" && (
                  <div className="rounded-lg border p-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            {quizDifficulty.map((level) => (
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
                                    {level === "easy" && "🌱"}
                                    {level === "average" && "🎯"}
                                    {level === "difficult" && "👑"}
                                  </div>
                                  <p className="font-medium capitalize">
                                    {level}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {level === "easy" && "Basic concepts"}
                                    {level === "average" &&
                                      "Intermediate level"}
                                    {level === "difficult" &&
                                      "Advanced concepts"}
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
                )}
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="grid gap-4">
                <div className="space-y-6">
                  {form.watch("items").map((_, index) => (
                    <div
                      key={`items.${index}`}
                      className="space-y-4 rounded-lg border p-4"
                    >
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
                      <div className="space-y-3">
                        <FormLabel>Choices</FormLabel>
                        <FormField
                          control={form.control}
                          name={`items.${index}.choices`}
                          render={() => (
                            <FormItem>
                              <RadioGroup
                                name={`items.${index}.choices`}
                                value={form
                                  .watch(`items.${index}.choices`)
                                  ?.findIndex((c) => c?.isCorrect)
                                  ?.toString()}
                                onValueChange={(value) => {
                                  [0, 1, 2, 3].forEach((i) => {
                                    form.setValue(
                                      `items.${index}.choices.${i}.isCorrect`,
                                      i === parseInt(value)
                                    );
                                  });
                                  // Clear the choices error when a correct answer is selected
                                  form.clearErrors(`items.${index}.choices`);
                                }}
                              >
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {[0, 1, 2, 3].map((choiceIndex) => (
                                    <div
                                      key={`choice.${choiceIndex}`}
                                      className="flex items-center gap-2"
                                    >
                                      <FormField
                                        control={form.control}
                                        name={`items.${index}.choices.${choiceIndex}.text`}
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                            <FormControl>
                                              <div className="relative">
                                                <Input
                                                  {...field}
                                                  placeholder={`Choice ${choiceIndex + 1}`}
                                                  className={cn(
                                                    form.watch(
                                                      `items.${index}.choices.${choiceIndex}.isCorrect`
                                                    ) &&
                                                      "border-green-500 focus-visible:ring-green-500"
                                                  )}
                                                />
                                                {form.watch(
                                                  `items.${index}.choices.${choiceIndex}.isCorrect`
                                                ) && (
                                                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    ✅
                                                  </span>
                                                )}
                                              </div>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <RadioGroupItem
                                        value={choiceIndex.toString()}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                              <p className="text-[0.8rem] font-medium text-destructive">
                                {
                                  // prettier-ignore
                                  form.formState.errors.items?.[index]
                                  // @ts-expect-error works fine - weird react-hook-form types
                                    ?.choices?.["choices"]?.message
                                }
                              </p>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
                  {currentStep < 2 ? "Next" : "Create Quiz"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
