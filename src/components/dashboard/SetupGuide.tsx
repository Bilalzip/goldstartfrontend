
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Create your QR code",
    description: "Generate a custom QR code for your business",
    href: "/dashboard/qr-code",
  },
  {
    id: 2,
    title: "Print your QR code materials",
    description: "Display your QR codes where customers can easily scan them",
    href: "/dashboard/qr-code",
  },
  {
    id: 3,
    title: "Set up your Google Review link",
    description: "Configure your Google review redirect settings",
    href: "/dashboard/settings",
  },
  {
    id: 4,
    title: "Train your staff",
    description: "Show your team how to ask customers for reviews",
    href: "#",
  },
];

export function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Setup Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-4 rounded-lg border p-4 transition-colors",
                completedSteps.includes(step.id)
                  ? "border-green-100 bg-green-50"
                  : "hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  completedSteps.includes(step.id)
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white"
                )}
              >
                {completedSteps.includes(step.id) ? (
                  <Check size={14} />
                ) : (
                  step.id
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStep(step.id)}
                  >
                    {completedSteps.includes(step.id)
                      ? "Mark as incomplete"
                      : "Mark as complete"}
                  </Button>
                  <Button variant="link" size="sm" asChild>
                    <Link to={step.href}>
                      Go to step <ChevronRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SetupGuide;
