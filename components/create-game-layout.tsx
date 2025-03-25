"use client";

import { useState } from "react";

import { CreateGameForm } from "@/components/create-game-form";
import { CreateGameStepper } from "@/components/create-game-stepper";

export function CreateGameLayout() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container mx-auto flex max-w-6xl gap-6 p-6">
      <div className="sticky top-[var(--header-height)] h-fit w-[240px] shrink-0 pt-6">
        <CreateGameStepper currentStep={currentStep} />
      </div>
      <div className="flex-1 pt-6">
        <CreateGameForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </div>
  );
}
