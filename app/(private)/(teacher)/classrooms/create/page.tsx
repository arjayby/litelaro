import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { CreateClassroomForm } from "@/components/create-classroom-form";
import { Button } from "@/components/ui/button";

export default function CreateClassroomPage() {
  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-8">
      <div className="space-y-2">
        <Button variant="ghost" size="icon">
          <Link href="/classrooms">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Classroom
          </h1>
        </div>
        <p className="text-muted-foreground">
          Create a new virtual learning space
        </p>
      </div>
      <CreateClassroomForm />
    </div>
  );
}
