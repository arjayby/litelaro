"use client";

import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { joinClassroomAction } from "../actions";

interface JoinClassroomFormProps {
  classroomId: string;
  visibility: "public" | "invite-only";
  existingMembership: boolean;
  isTeacher: boolean;
}

export function JoinClassroomForm({
  classroomId,
  visibility,
  existingMembership,
  isTeacher,
}: JoinClassroomFormProps) {
  const { execute, result, isExecuting } = useAction(joinClassroomAction);

  useEffect(() => {
    if (result.data?.error) {
      toast.error(result.data.error);
    } else {
      toast.success("Successfully joined classroom");
    }
  }, [result.data?.error]);

  return (
    <CardFooter>
      <Button
        className="w-full"
        onClick={() => execute({ classroomId })}
        disabled={existingMembership || isTeacher}
        variant={existingMembership ? "outline" : "default"}
        loading={isExecuting}
      >
        {existingMembership
          ? "Already joined"
          : isTeacher
            ? "Only students can join classrooms"
            : visibility === "public"
              ? "Join Now"
              : "Request to Join"}
      </Button>
    </CardFooter>
  );
}
