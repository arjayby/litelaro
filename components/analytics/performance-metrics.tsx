import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PerformanceMetrics() {
  const metrics = [
    {
      subject: "Literature",
      averageScore: 85,
      participationRate: 92,
      improvement: 5,
    },
    {
      subject: "Poetry",
      averageScore: 78,
      participationRate: 88,
      improvement: 3,
    },
    {
      subject: "Creative Writing",
      averageScore: 82,
      participationRate: 90,
      improvement: 4,
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{metric.subject}</h3>
                <span className="text-sm text-muted-foreground">
                  {metric.averageScore}% avg. score
                </span>
              </div>
              <Progress value={metric.participationRate} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{metric.participationRate}% participation</span>
                <span>+{metric.improvement}% improvement</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}