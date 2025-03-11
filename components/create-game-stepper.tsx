import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Game Info",
    description: "Title, description, and visibility",
  },
  {
    title: "Game Setup",
    description: "Type, difficulty, and category",
  },
  {
    title: "Questions",
    description: "Add game items",
  },
];

export function CreateGameStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <div key={step.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor:
                  index < currentStep ? "hsl(var(--primary))" : "white",
                borderColor:
                  index <= currentStep
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-[1px]",
                index < currentStep && "text-primary-foreground"
              )}
            >
              <motion.div
                initial={false}
                animate={{ scale: 1 }}
                key={index < currentStep ? "check" : "number"}
                transition={{ type: "spring", duration: 0.5 }}
              >
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckIcon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    index < currentStep
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="-my-4 h-20 w-[1px]"
              />
            )}
          </div>
          <motion.div
            initial={false}
            animate={{
              opacity: index <= currentStep ? 1 : 0.5,
              x: index === currentStep ? 10 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-0.5 pt-2"
          >
            <h3 className="text-sm font-medium">{step.title}</h3>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
