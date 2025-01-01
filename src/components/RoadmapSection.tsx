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

const getMonthDescription = (id: string): string => {
  switch (id) {
    case "month1":
      return "Master the fundamentals of web servers, including configuration and management of popular server software. Learn how to set up, optimize, and troubleshoot different web server environments for optimal performance.";
    case "month2":
      return "Dive deep into Linux process management, understanding how to monitor system resources, manage services, and implement effective logging strategies for better system administration.";
    case "month3":
      return "Explore version control systems with a focus on Git. Learn collaborative workflows, branching strategies, and advanced Git features for effective team development.";
    case "month4":
      return "Get hands-on experience with essential DevOps tools. Master containerization with Docker and implement continuous integration/deployment pipelines using Jenkins.";
    case "month5":
      return "Learn infrastructure as code principles and tools. Implement automation using popular configuration management tools and create scalable infrastructure templates.";
    case "month6":
      return "Explore cloud computing platforms with a focus on AWS. Learn to deploy and manage cloud resources, implement serverless architectures, and develop multi-cloud strategies.";
    default:
      return "";
  }
};

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
          <p className="text-sm text-muted-foreground mt-2">
            {getMonthDescription(topic.id)}
          </p>
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