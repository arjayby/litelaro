import { Gamepad2 } from "lucide-react";

interface PlaceholderImageProps {
  className?: string;
  title?: string;
}

export function PlaceholderImage({ className, title }: PlaceholderImageProps) {
  return (
    <div
      className={`flex aspect-[3/4] h-full w-full items-center justify-center bg-muted/30 ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-2 p-8 text-center">
        <Gamepad2 className="h-12 w-12" />
        <p className="text-lg text-muted-foreground">{title || "Game Image"}</p>
      </div>
    </div>
  );
}
