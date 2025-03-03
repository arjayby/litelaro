"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateQuizForm } from "./create-quiz-form";
import { CreateQuizStepper } from "./create-quiz-stepper";

export function CreateQuizLayout() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container relative mx-auto max-w-5xl py-6">
      <div className="fixed w-[240px] space-y-6">
        <Link href="/quizzes">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Button>
        </Link>
        <CreateQuizStepper currentStep={currentStep} />
      </div>
      <div className="ml-[264px]">
        <CreateQuizForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </div>
  );
}
