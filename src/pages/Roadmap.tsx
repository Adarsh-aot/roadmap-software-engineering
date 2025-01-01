import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoadmapSection from "@/components/RoadmapSection";
import ProgressBar from "@/components/ProgressBar";

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

const capstoneProject = {
  title: "Final Project (Weeks 23-24): Capstone Project",
  description: `Develop and deploy a full-stack application with the following:
  • Frontend hosted on S3
  • Backend hosted on an EC2 instance or serverless function
  • CI/CD pipeline with Jenkins and CodePipeline
  • Configuration management with Ansible or Chef
  • Infrastructure deployed with Terraform
  
  Outcome: Comprehensive understanding and integration of all tools learned.`,
};

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

    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

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
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">DevOps Learning Roadmap</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <ProgressBar progress={calculateProgress()} />

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {monthlyTopics.map((topic) => (
              <RoadmapSection
                key={topic.id}
                topic={topic}
                progress={progress}
                onCheckboxChange={handleCheckboxChange}
                isVisible={visibleSections.includes(topic.id)}
                isComplete={isMonthComplete(topic.id)}
              />
            ))}
            
            <Card className="bg-card mt-8">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">
                  {capstoneProject.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {capstoneProject.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Roadmap;
