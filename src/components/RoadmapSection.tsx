import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plane } from "lucide-react";

interface RoadmapSectionProps {
  topic: {
    id: string;
    title: string;
    items: string[];
  };
  progress: Record<string, boolean>;
  onCheckboxChange: (topicId: string, item: string) => void;
  isVisible: boolean;
  isComplete: boolean;
}

const RoadmapSection = ({
  topic,
  progress,
  onCheckboxChange,
  isVisible,
  isComplete,
}: RoadmapSectionProps) => {
  return (
    <div
      id={topic.id}
      className={`roadmap-section animate-on-scroll ${
        isVisible ? "visible" : ""
      }`}
    >
      <Card className="relative overflow-hidden bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
            <Plane
              className={`w-6 h-6 ${
                isComplete ? "text-primary plane-animation" : "text-muted-foreground"
              }`}
            />
            {topic.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topic.items.map((item) => (
              <div key={`${topic.id}-${item}`} className="flex items-start space-x-3">
                <Checkbox
                  id={`${topic.id}-${item}`}
                  checked={progress[`${topic.id}-${item}`] || false}
                  onCheckedChange={() => onCheckboxChange(topic.id, item)}
                />
                <label
                  htmlFor={`${topic.id}-${item}`}
                  className="text-sm leading-none text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapSection;