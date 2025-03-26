import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h1 className="text-center font-instrument-serif text-[64px] font-normal italic leading-[83px]">
          <Link href="/">Litelaro</Link>
        </h1>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">404</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold">Invite Not Found</h2>
            <p className="text-muted-foreground">
              The classroom invite you&apos;re looking for doesn&apos;t exist or
              has expired.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>
              <Link href="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
