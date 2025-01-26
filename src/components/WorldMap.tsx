import { type Country } from "@/data/countries";
import { cn } from "@/lib/utils";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  type GeographyProps,
} from "react-simple-maps";

// World map TopoJSON source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface WorldMapProps {
  guessedCountries: Country[];
  className?: string;
}

export function WorldMap({ guessedCountries, className }: WorldMapProps) {
  return (
    <div
      className={cn(
        "relative w-full mx-auto aspect-[2/1] bg-muted rounded-lg overflow-hidden",
        className
      )}
    >
      <ComposableMap
        width={930}
        height={500}
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          center: [0, 40],
        }}
      >
        <Geographies geography={geoUrl}>
          {({
            geographies,
          }: {
            geographies: Array<GeographyProps["geography"]>;
          }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                tabIndex={-1}
                style={{
                  default: {
                    fill: "var(--muted-foreground)",
                    fillOpacity: 0.2,
                    stroke: "var(--muted-foreground)",
                    strokeWidth: 0.3,
                    strokeOpacity: 1,
                    outline: "none",
                  },
                  hover: {
                    fill: "var(--muted-foreground)",
                    fillOpacity: 0.3,
                    stroke: "var(--muted-foreground)",
                    strokeWidth: 0.3,
                    strokeOpacity: 1,
                    outline: "none",
                  },
                  pressed: {
                    fill: "var(--muted-foreground)",
                    fillOpacity: 0.4,
                    stroke: "var(--muted-foreground)",
                    strokeWidth: 0.3,
                    strokeOpacity: 1,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* Guessed Countries Markers */}
        {guessedCountries.map((country) => {
          const [lat, lng] = country.latlng;

          return (
            <Marker key={country.code} coordinates={[lng, lat]}>
              <g>
                <circle
                  r="1.5"
                  className="fill-primary animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <circle r="1" className="fill-primary" />
              </g>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
