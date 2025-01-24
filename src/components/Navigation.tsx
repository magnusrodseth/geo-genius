import { Globe2, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-colors hover:opacity-80"
        >
          <Globe2 className="h-6 w-6" />
          <span className="font-semibold text-lg">GeoGenius</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/game">
            <Button variant="ghost" size="sm" className="gap-2">
              <Gamepad2 className="h-5 w-5" />
              Play
            </Button>
          </Link>
          <Link to="/scoreboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <Trophy className="h-5 w-5" />
              Scoreboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
