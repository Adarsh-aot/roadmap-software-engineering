import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const track = location.pathname.substring(1);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {track.charAt(0).toUpperCase() + track.slice(1)} Track
          </h1>
          <p className="text-muted-foreground">
            Coming soon! This learning track is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;