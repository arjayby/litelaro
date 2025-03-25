"use client";

import { useState } from "react";

import { CreateQuizForm } from "./create-quiz-form";
import { CreateQuizStepper } from "./create-quiz-stepper";

export function CreateQuizLayout() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container mx-auto flex max-w-6xl gap-6 p-6">
      <div className="sticky top-[var(--header-height)] h-fit w-[240px] shrink-0 pt-6">
        <CreateQuizStepper currentStep={currentStep} />
      </div>
      <div className="flex-1 pt-6">
        <CreateQuizForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </div>
  );
}
