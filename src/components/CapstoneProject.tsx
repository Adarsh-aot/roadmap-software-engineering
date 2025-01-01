import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CapstoneProject = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  const requirements = [
    "Frontend hosted on S3",
    "Backend hosted on an EC2 instance or serverless function",
    "CI/CD pipeline with Jenkins and CodePipeline",
    "Configuration management with Ansible or Chef",
    "Infrastructure deployed with Terraform"
  ];

  const handleCheckboxChange = (requirement: string) => {
    setProgress(prev => ({
      ...prev,
      [requirement]: !prev[requirement]
    }));
  };

  return (
    <Card className="bg-card mt-8 border-2 border-primary shadow-lg">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-2xl text-card-foreground font-bold">
          Final Project (Weeks 23-24): Capstone Project
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Project Requirements:</h3>
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg">
            Develop and deploy a full-stack application with the following components:
          </p>
          <ul className="space-y-4 ml-4">
            {requirements.map((requirement) => (
              <li key={requirement} className="flex items-start space-x-3">
                <Checkbox
                  id={requirement}
                  checked={progress[requirement] || false}
                  onCheckedChange={() => handleCheckboxChange(requirement)}
                />
                <label
                  htmlFor={requirement}
                  className="text-sm leading-none cursor-pointer hover:text-foreground transition-colors"
                >
                  {requirement}
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-accent/20 rounded-lg">
            <p className="font-semibold text-accent-foreground">
              Outcome: Comprehensive understanding and integration of all tools learned.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapstoneProject;