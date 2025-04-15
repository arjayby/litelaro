import { Clock, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClassroomEmoji } from "@/lib/utils/classroom-emoji";

interface ClassroomCardProps {
  id: string;
  title: string;
  description: string | null;
  visibility: "public" | "invite-only";
  code: string;
  studentCount: number;
  createdAt: Date;
  role: "student" | "teacher";
}

export function ClassroomCard({
  id,
  title,
  description,
  visibility,
  code,
  studentCount,
  createdAt,
  role,
}: ClassroomCardProps) {
  return (
    <Link
      href={
        role === "teacher" ? `/classrooms/${id}` : `/dashboard/classrooms/${id}`
      }
    >
      <Card className="transition-colors hover:bg-accent">
        <CardHeader>
          <CardTitle className="line-clamp-1 space-x-2">
            <span>{title}</span>
            <Badge variant="outline">{code}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description || "No description provided"}
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground">
                <span>
                  {getClassroomEmoji.visibility(visibility).emoji}{" "}
                  {getClassroomEmoji.visibility(visibility).label}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{studentCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
