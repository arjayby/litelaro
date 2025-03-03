import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Image
          src="/litelaro.svg"
          alt="Litelaro"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="font-instrument-serif text-xl italic">Litelaro</div>
      </div>
    </header>
  );
}
