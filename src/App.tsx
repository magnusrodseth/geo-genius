import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/pages/HomePage";
import { GamePage } from "@/pages/GamePage";
import { ScoreboardPage } from "@/pages/ScoreboardPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/scoreboard" element={<ScoreboardPage />} />
            </Routes>
          </div>
        </main>
      </div>
      <Toaster />
    </Router>
  );
}
