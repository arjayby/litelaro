import { BrandHeader } from "@/components/brand-header";
import { CreateGameLayout } from "@/components/create-game-layout";

export default async function CreateGamePage() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <BrandHeader />
      <CreateGameLayout />
    </div>
  );
}
