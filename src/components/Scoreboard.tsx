import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Score } from "@/hooks/useScoreboard";

interface ScoreboardProps {
  scores: Score[];
  onClear: () => void;
}

export function Scoreboard({ scores, onClear }: ScoreboardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-card rounded-lg p-4 w-full md:max-w-[48rem]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Personal Best Times</h2>
        {scores.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="h-[20rem] rounded-md border p-4">
        {scores.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No scores yet. Complete the quiz to set a record!
          </p>
        ) : (
          <div className="space-y-2">
            {scores.map((score, index) => (
              <div
                key={score.timestamp}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm">#{index + 1}</span>
                  <div>
                    <div className="font-medium">{formatTime(score.time)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(score.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {score.correctGuesses}/{score.totalCountries} countries
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
