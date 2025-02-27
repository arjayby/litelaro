"use client";

import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

import { completeProfileAction } from "@/app/complete-profile/actions";
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
import { ProfileFormValues, profileSchema } from "@/lib/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";

export function CompleteProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      givenName: "",
      familyName: "",
    },
  });

  const { execute, result } = useAction(completeProfileAction);

  async function onSubmit(data: ProfileFormValues) {
    execute(data);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-instrument-serif text-2xl font-normal">
          Complete your profile
        </CardTitle>
        <CardDescription>
          Please provide your information to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      name="givenName"
                      autoComplete="given-name"
                    />
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
                    <Input
                      {...field}
                      name="familyName"
                      autoComplete="family-name"
                    />
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
                    name="role"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
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
            {result?.data?.error && (
              <p className="text-sm text-red-500">{result.data.error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
            >
              Complete Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
