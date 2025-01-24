import { type Country } from "@/data/countries";
import { cn } from "@/lib/utils";

interface WorldMapProps {
  guessedCountries: Country[];
  className?: string;
}

export function WorldMap({ guessedCountries, className }: WorldMapProps) {
  return (
    <div
      className={cn(
        "relative w-3/4 mx-auto aspect-[2/1] bg-muted rounded-lg overflow-hidden",
        className
      )}
    >
      <svg
        viewBox="0 0 2000 1000"
        className="w-full h-full"
        style={{ background: "var(--background)" }}
      >
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            className="text-muted-foreground/20"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Countries */}
        {guessedCountries.map((country) => {
          const [lat, lng] = country.latlng;

          // Convert lat/lng to SVG coordinates
          const x = (lng + 180) * (2000 / 360);
          const y = (90 - lat) * (1000 / 180);

          return (
            <g key={country.code} transform={`translate(${x}, ${y})`}>
              <circle
                r="5"
                className="fill-primary animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <circle r="3" className="fill-primary" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
