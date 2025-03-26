"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { ClassroomFormValues, classroomSchema } from "@/lib/schemas/classroom";
import { getClassroomEmoji } from "@/lib/utils/classroom-emoji";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClassroomAction } from "../app/(private)/(teacher)/classrooms/create/actions";

export function CreateClassroomForm() {
  const { execute, result, hasSucceeded, isExecuting } = useAction(
    createClassroomAction
  );

  const form = useForm<z.infer<typeof classroomSchema>>({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "invite-only",
    },
  });

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Classroom created successfully");
    }
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  }, [hasSucceeded, result.data?.error]);

  async function onSubmit(data: ClassroomFormValues) {
    execute(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter classroom title" {...field} />
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter classroom description"
                  {...field}
                />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <span>
                        {getClassroomEmoji.visibility("public").emoji}
                      </span>
                      <span>
                        {getClassroomEmoji.visibility("public").label}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="invite-only">
                    <div className="flex items-center gap-2">
                      <span>
                        {getClassroomEmoji.visibility("invite-only").emoji}
                      </span>
                      <span>
                        {getClassroomEmoji.visibility("invite-only").label}
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {field.value === "public"
                  ? "Anyone can find and join this classroom"
                  : "Only people with the invite code can join this classroom"}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isExecuting}>
          Create Classroom
        </Button>
      </form>
    </Form>
  );
}
