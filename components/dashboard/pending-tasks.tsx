import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PendingTasks() {
  const tasks = [
    {
      title: "Grade Mathematics Quiz",
      class: "Mathematics 101",
      pending: "12 submissions",
      priority: "High",
    },
    {
      title: "Review Student Reports",
      class: "Science Class",
      pending: "End of term reports",
      priority: "Medium",
    },
    {
      title: "Update Lesson Plan",
      class: "All Classes",
      pending: "Next week's content",
      priority: "Low",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  {task.class} • {task.pending}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}