import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Plane } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  items: string[];
}

const monthlyTopics: Topic[] = [
  {
    id: "month1",
    title: "Month 1: Basic Web Server Knowledge",
    items: [
      "Introduction to Web Servers",
      "NGINX Configuration",
      "Apache Advanced Features",
      "Tomcat Server",
    ],
  },
  {
    id: "month2",
    title: "Month 2: Linux Process Management",
    items: [
      "Process Management Basics",
      "System Monitoring and Logging",
      "Scheduled Processes and Automation",
    ],
  },
  {
    id: "month3",
    title: "Month 3: Version Control Systems",
    items: [
      "Introduction to VCS, CVCS, DVCS",
      "Advanced Git Features",
      "Collaborative Work with Git",
    ],
  },
  {
    id: "month4",
    title: "Month 4: Build and Deployment Tools",
    items: [
      "Introduction to Build Tools",
      "Docker Basics",
      "Jenkins for CI/CD",
    ],
  },
  {
    id: "month5",
    title: "Month 5: Configuration Management and IAC",
    items: [
      "Ansible Basics",
      "Chef and Puppet",
      "Terraform for IAC",
      "Cloud Formation and ARM Templates",
    ],
  },
  {
    id: "month6",
    title: "Month 6: Cloud Platforms",
    items: [
      "AWS Core Services",
      "Serverless Computing",
      "AWS DevOps Tools",
      "Database as a Service",
      "Multi-Cloud Strategy",
    ],
  },
];

const Roadmap = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }

    // Load saved progress
    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".roadmap-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navigate]);

  const handleCheckboxChange = (topicId: string, item: string) => {
    const key = `${topicId}-${item}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem("progress", JSON.stringify(newProgress));

    if (!progress[key]) {
      toast({
        title: "Progress Updated",
        description: "Topic marked as completed!",
        duration: 2000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const calculateProgress = () => {
    const totalItems = monthlyTopics.reduce((acc, month) => acc + month.items.length, 0);
    const completedItems = Object.values(progress).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const isMonthComplete = (monthId: string) => {
    const month = monthlyTopics.find((m) => m.id === monthId);
    if (!month) return false;
    return month.items.every((item) => progress[`${monthId}-${item}`]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Learning Roadmap</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Card className="mb-6 bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-card-foreground">Overall Progress</span>
              <span className="text-2xl font-bold text-primary">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {monthlyTopics.map((month, index) => (
              <div
                key={month.id}
                id={month.id}
                className={`roadmap-section animate-on-scroll ${
                  visibleSections.includes(month.id) ? "visible" : ""
                }`}
              >
                <Card className="relative overflow-hidden bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                      <Plane
                        className={`w-6 h-6 ${
                          isMonthComplete(month.id) ? "text-primary plane-animation" : "text-muted-foreground"
                        }`}
                      />
                      {month.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {month.items.map((item) => (
                        <div key={`${month.id}-${item}`} className="flex items-start space-x-3">
                          <Checkbox
                            id={`${month.id}-${item}`}
                            checked={progress[`${month.id}-${item}`] || false}
                            onCheckedChange={() => handleCheckboxChange(month.id, item)}
                          />
                          <label
                            htmlFor={`${month.id}-${item}`}
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
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Roadmap;