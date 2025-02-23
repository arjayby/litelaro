import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ClassOverview() {
  const classes = [
    {
      name: "Mathematics 101",
      students: 30,
      attendance: 28,
      progress: 75,
      nextLesson: "Algebra II",
    },
    {
      name: "Science Class",
      students: 25,
      attendance: 23,
      progress: 60,
      nextLesson: "Chemistry Lab",
    },
    {
      name: "English Literature",
      students: 28,
      attendance: 26,
      progress: 85,
      nextLesson: "Poetry Analysis",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((class_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{class_.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance: {class_.attendance}/{class_.students}</span>
                      <span>{Math.round((class_.attendance/class_.students) * 100)}%</span>
                    </div>
                    <Progress value={class_.progress} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Next: {class_.nextLesson}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}