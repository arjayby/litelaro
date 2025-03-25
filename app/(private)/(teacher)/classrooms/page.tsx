import { MoveRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function ClassroomPage() {
  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classroom</h1>
          <p className="text-muted-foreground">
            Manage your virtual learning spaces
          </p>
        </div>
        <Link href="/classrooms/create">
          <Button variant="ghost" size="lg">
            Create Classroom
            <MoveRight />
          </Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {/* Classroom list will be added here */}
        <p className="py-8 text-center text-muted-foreground">
          No classrooms created yet
        </p>
      </div>
    </div>
  );
}
