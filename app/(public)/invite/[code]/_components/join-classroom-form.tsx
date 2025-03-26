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
}

export function JoinClassroomForm({
  classroomId,
  visibility,
  existingMembership,
}: JoinClassroomFormProps) {
  const { execute, result, hasSucceeded, isExecuting } =
    useAction(joinClassroomAction);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Successfully joined classroom");
    }
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  }, [hasSucceeded, result.data?.error]);

  return (
    <CardFooter>
      <Button
        className="w-full"
        onClick={() => execute({ classroomId })}
        disabled={!!existingMembership}
        variant={existingMembership ? "outline" : "default"}
        loading={isExecuting}
      >
        {existingMembership
          ? "Already joined"
          : visibility === "public"
            ? "Join Now"
            : "Request to Join"}
      </Button>
    </CardFooter>
  );
}
