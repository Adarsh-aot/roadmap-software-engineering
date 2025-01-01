import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <Card className="mb-6 bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-card-foreground">
            Overall Progress
          </span>
          <span className="text-2xl font-bold text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;