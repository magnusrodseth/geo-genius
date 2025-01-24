import { useScoreboard } from "@/hooks/useScoreboard";
import { Scoreboard } from "@/components/Scoreboard";

export function ScoreboardPage() {
  const { scores, clearScores } = useScoreboard();

  return (
    <div className="w-full px-4 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
        <Scoreboard scores={scores} onClear={clearScores} />
      </div>
    </div>
  );
}
