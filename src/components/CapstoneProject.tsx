import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CapstoneProject = () => {
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
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Frontend hosted on S3</li>
            <li>Backend hosted on an EC2 instance or serverless function</li>
            <li>CI/CD pipeline with Jenkins and CodePipeline</li>
            <li>Configuration management with Ansible or Chef</li>
            <li>Infrastructure deployed with Terraform</li>
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