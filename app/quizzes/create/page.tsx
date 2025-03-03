import { BrandHeader } from "@/components/brand-header";
import { CreateQuizLayout } from "@/components/create-quiz-layout";

export default async function CreateQuizPage() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <BrandHeader />
      <CreateQuizLayout />
    </div>
  );
}
