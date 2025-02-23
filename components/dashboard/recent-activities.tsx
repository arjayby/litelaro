import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivities() {
  const activities = [
    {
      type: "Quiz Submission",
      title: "Mathematics Quiz 3",
      details: "15 students submitted",
      date: "2 hours ago",
    },
    {
      type: "Class Activity",
      title: "Science Class 101",
      details: "Attendance: 28/30 students",
      date: "1 day ago",
    },
    {
      type: "Student Progress",
      title: "Weekly Report Generated",
      details: "All classes updated",
      date: "2 days ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.type} • {activity.details}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {activity.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}