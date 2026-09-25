"use client";
import { useEffect, useState } from "react";
import { formatName } from "@/lib/api";

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const BaseStats = ({ stats }: PokemonStatsProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {stats.map(({ stat, base_stat }, index) => {
        const percentage = Math.min(100, (base_stat / 255) * 100);

        return (
          <div key={stat.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium capitalize text-slate-600">
                {formatName(stat.name)}
              </span>

              <span className="font-bold text-slate-900">{base_stat}</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              <div
                className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-green-400 via-orange-400 to-red-500 transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${percentage}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BaseStats;
