import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function EngagementTrends() {
  const trends = [
    {
      activity: "Quiz Participation",
      currentWeek: 92,
      trend: "increase",
      change: 8,
      details: "Higher engagement in literature quizzes",
    },
    {
      activity: "Discussion Activity",
      currentWeek: 78,
      trend: "stable",
      change: 0,
      details: "Consistent participation in poetry discussions",
    },
    {
      activity: "Assignment Completion",
      currentWeek: 95,
      trend: "increase",
      change: 12,
      details: "Improved submission rate for creative writing",
    },
    {
      activity: "Peer Reviews",
      currentWeek: 85,
      trend: "increase",
      change: 15,
      details: "Growing participation in peer feedback",
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Student Engagement Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trends.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.activity}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{item.currentWeek}%</span>
                  <Badge
                    variant={item.trend === "increase" ? "default" : "secondary"}
                    className="font-normal"
                  >
                    {item.change > 0 ? `+${item.change}%` : "stable"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}