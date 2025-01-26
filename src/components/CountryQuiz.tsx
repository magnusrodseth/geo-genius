import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timer, Trophy, RefreshCw, Play } from "lucide-react";
import { toast } from "sonner";
import { countries, type Country, regions } from "@/data/countries";
import { useScoreboard } from "@/hooks/useScoreboard";
import { Scoreboard } from "@/components/Scoreboard";
import { WorldMap } from "@/components/WorldMap";

export function CountryQuiz() {
  const [guessedCountries, setGuessedCountries] = useState<Country[]>([]);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | "all">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const { scores, addScore, clearScores } = useScoreboard();

  // Filter countries based on selected region
  const gameCountries =
    selectedRegion === "all"
      ? countries
      : countries.filter((country) => country.region === selectedRegion);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGameStarted && !isGameComplete) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, isGameComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const checkGuess = (input: string) => {
    const guess = input.trim().toLowerCase();
    setErrorMessage(null);

    const matchedCountry = gameCountries.find(
      (country) => country.name.toLowerCase() === guess
    );

    if (matchedCountry) {
      if (guessedCountries.some((c) => c.code === matchedCountry.code)) {
        setErrorMessage(`You've already guessed ${matchedCountry.name}!`);
        return false;
      }

      setGuessedCountries((prev) => [...prev, matchedCountry]);
      setInput("");

      if (guessedCountries.length + 1 === gameCountries.length) {
        setIsGameComplete(true);
        const newScore = {
          time: timer,
          correctGuesses: gameCountries.length,
          totalCountries: gameCountries.length,
          region: selectedRegion,
          timestamp: Date.now(),
        };
        addScore(newScore);
        toast.success("Congratulations! 🎉", {
          description: `You've named all ${gameCountries.length} ${
            selectedRegion === "all" ? "" : selectedRegion + " "
          }countries in ${formatTime(timer)}!`,
        });
      }
      return true;
    }
    return false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    checkGuess(newInput);
  };

  const startGame = () => {
    setIsGameStarted(true);
    inputRef.current?.focus();
  };

  const resetGame = () => {
    setGuessedCountries([]);
    setInput("");
    setTimer(0);
    setErrorMessage(null);
    setIsGameComplete(false);
    setIsGameStarted(false);
  };

  const progress = (guessedCountries.length / gameCountries.length) * 100;

  if (!isGameStarted) {
    return (
      <div className="w-full p-6 flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold text-center">Country Quiz</h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          Test your knowledge! Can you name all {gameCountries.length} countries
          {selectedRegion !== "all" ? ` in ${selectedRegion}` : " in the world"}
          ?
        </p>

        <div className="flex flex-col items-center gap-4">
          <Select
            value={selectedRegion}
            onValueChange={(value) => setSelectedRegion(value)}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="lg" onClick={startGame}>
            <Play className="mr-2 h-5 w-5" />
            Start Game
          </Button>
        </div>

        <Scoreboard scores={scores} onClear={clearScores} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Country Quiz</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {selectedRegion === "all" ? "World" : selectedRegion}
          </span>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="font-mono text-lg">{formatTime(timer)}</span>
          </div>
        </div>
      </div>

      <WorldMap
        guessedCountries={guessedCountries}
        className="border shadow-sm"
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Progress
            value={progress}
            className="flex-1 h-3"
            indicatorClass="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <span className="text-sm font-medium">
            {guessedCountries.length}/{gameCountries.length} (
            {Math.round(progress)}%)
          </span>
        </div>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter a country name..."
            value={input}
            onChange={handleInputChange}
            disabled={isGameComplete}
            className="flex-1"
          />
          <Button variant="outline" onClick={resetGame}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        {errorMessage && (
          <p className="text-sm text-destructive mt-2">{errorMessage}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-card rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Guessed Countries</h2>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            {guessedCountries.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No countries guessed yet. Start typing to play!
              </p>
            ) : (
              <div className="grid grid-cols-2 md:rogrid-cols-4 gap-2">
                {guessedCountries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country) => (
                    <div
                      key={country.code}
                      className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm"
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span className="truncate">{country.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {isGameComplete && (
        <div className="flex items-center justify-center gap-4 p-6 bg-primary/5 rounded-lg">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div className="text-center">
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-muted-foreground">
              You completed the quiz in {formatTime(timer)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
