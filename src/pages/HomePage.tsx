import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, Trophy } from "lucide-react";

export function HomePage() {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to GeoGenius</h1>
        <p className="text-xl text-muted-foreground">
          Test your knowledge of world geography in this exciting quiz game!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/game">
            <Button size="lg" className="gap-2">
              <Gamepad2 className="h-5 w-5" />
              Start Playing
            </Button>
          </Link>
          <Link to="/scoreboard">
            <Button size="lg" variant="outline" className="gap-2">
              <Trophy className="h-5 w-5" />
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
