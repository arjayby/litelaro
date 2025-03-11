"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CreateGameForm } from "@/components/create-game-form";
import { CreateGameStepper } from "@/components/create-game-stepper";
import { Button } from "@/components/ui/button";

export function CreateGameLayout() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container relative mx-auto max-w-5xl py-6">
      <div className="fixed w-[240px] space-y-6">
        <Link href="/motivational-games">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Motivational Games
          </Button>
        </Link>
        <CreateGameStepper currentStep={currentStep} />
      </div>
      <div className="ml-[264px]">
        <CreateGameForm
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </div>
  );
}
