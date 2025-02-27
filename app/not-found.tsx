import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex max-w-md flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page not found</p>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
