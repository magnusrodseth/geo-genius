import { CountryQuiz } from "@/components/CountryQuiz";

export function GamePage() {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <CountryQuiz />
      </div>
    </div>
  );
}
