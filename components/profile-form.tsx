"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProfileAction } from "@/app/profile/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { DEFAULT_AVATARS } from "@/lib/constants";
import { ProfileFormValues, profileSchema } from "@/lib/schemas/profile";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProfileFormProps {
  defaultValues: {
    given_name: string;
    family_name: string;
    role: string;
    avatar_url: string | null;
  };
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      givenName: defaultValues.given_name,
      familyName: defaultValues.family_name,
      role: defaultValues.role as "teacher" | "student",
      avatarUrl: defaultValues.avatar_url || "",
    },
  });

  const { execute, result, status } = useAction(updateProfileAction);

  useEffect(() => {
    if (status === "hasSucceeded") {
      toast.success("Profile updated successfully");
    }
    if (result?.data?.error) {
      toast.error(result.data.error);
    }
  }, [status, result]);

  async function onSubmit(data: ProfileFormValues) {
    execute(data);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-instrument-serif text-2xl font-normal">
          Profile
        </CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                      {DEFAULT_AVATARS.map((url, index) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => field.onChange(url)}
                          className={cn(
                            "flex items-center justify-center rounded-lg border-2 p-1 hover:border-primary",
                            field.value === url
                              ? "border-primary"
                              : "border-transparent"
                          )}
                        >
                          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
                            <AvatarImage src={url} />
                            <AvatarFallback>Avatar {index + 1}</AvatarFallback>
                          </Avatar>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={status === "executing"}>
              Update Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
