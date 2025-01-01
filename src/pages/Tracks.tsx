import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tracks = [
  { id: "devops", title: "DevOps Engineering", description: "Master the tools and practices of modern DevOps" },
  { id: "data", title: "Data Engineering", description: "Build data pipelines and infrastructure" },
  { id: "cloud", title: "Cloud Architecture", description: "Design and implement cloud solutions" },
  { id: "security", title: "Security Engineering", description: "Implement and maintain security practices" },
  { id: "mlops", title: "MLOps", description: "Machine Learning Operations and Infrastructure" },
  { id: "sre", title: "Site Reliability Engineering", description: "Ensure system reliability and performance" },
  { id: "platform", title: "Platform Engineering", description: "Build and maintain development platforms" },
  { id: "infrastructure", title: "Infrastructure Engineering", description: "Design and manage IT infrastructure" },
];

const Tracks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Learning Tracks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <Card 
              key={track.id}
              className="hover:border-primary transition-colors cursor-pointer"
              onClick={() => navigate(track.id === "devops" ? "/roadmap" : `/${track.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{track.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{track.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracks;