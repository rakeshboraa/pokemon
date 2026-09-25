"use client";
import { useState } from "react";
import { formatName, TYPE_COLORS } from "@/lib/api";
import { Move, MoveDetails } from "@/types";
import Loader from "./Loader";
import MoveStat from "./MoveStat";
type Props = {
  moves: {
    move: Move;
  }[];
};

export default function PokemonMoves({ moves }: Props) {
  const [selectedMove, setSelectedMove] = useState<MoveDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoveClick = async (move: Move) => {
    setLoading(true);

    try {
      const response = await fetch(move.url);

      if (!response.ok) {
        throw new Error("Failed to fetch move");
      }

      const data: MoveDetails = await response.json();
      setSelectedMove(data);
    } catch {
      setSelectedMove(null);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (!loading) {
      setSelectedMove(null);
    }
  };

  return (
    <>
      <div className="max-h-47 overflow-y-auto pr-1 pt-2">
        <div className="flex flex-wrap gap-2">
          {moves.map(({ move }) => {
            const isSelected = selectedMove?.name === move.name;

            return (
              <button
                key={move.name}
                type="button"
                onClick={() => handleMoveClick(move)}
                aria-pressed={isSelected}
                className="rounded-lg border-2 border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium capitalize text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-400 hover:bg-yellow-50 sm:px-3 sm:text-sm"
              >
                {formatName(move.name)}
              </button>
            );
          })}
        </div>
      </div>

      {(loading || selectedMove) && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border-2 border-yellow-200 bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {loading ? (
              <div className="flex min-h-52 items-center justify-center">
                <Loader />
              </div>
            ) : selectedMove ? (
              <>
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-linear-to-r from-yellow-50 to-sky-50 px-4 py-4 sm:px-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                      Move Details
                    </p>

                    <h3 className="mt-1 wrap-break-word text-xl font-extrabold capitalize text-slate-900 sm:text-2xl">
                      {formatName(selectedMove.name)}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close move details"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 sm:h-9 sm:w-9 sm:text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="overflow-y-auto p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
                    <span
                      className="rounded-full border-2 border-white px-3 py-1 text-[11px] font-bold capitalize text-white shadow-md sm:px-4 sm:py-1.5 sm:text-xs"
                      style={{
                        backgroundColor:
                          TYPE_COLORS[selectedMove.type.name] ?? "#777",
                      }}
                    >
                      {formatName(selectedMove.type.name)}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold capitalize text-slate-600 sm:px-4 sm:py-1.5 sm:text-xs">
                      {formatName(selectedMove.damage_class.name)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                    <MoveStat
                      label="Power"
                      value={selectedMove.power ?? "—"}
                    />

                    <MoveStat
                      label="Accuracy"
                      value={
                        selectedMove.accuracy !== null
                          ? `${selectedMove.accuracy}%`
                          : "—"
                      }
                    />

                    <MoveStat label="PP" value={selectedMove.pp} />
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:mt-5 sm:p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                      Effect
                    </p>

                    {selectedMove.effect_entries
                      .filter(({ language }) => language.name === "en")
                      .map(({ effect }) => (
                        <p
                          key={effect}
                          className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6"
                        >
                          {effect}
                        </p>
                      ))}

                    {selectedMove.effect_entries.filter(
                      ({ language }) => language.name === "en",
                    ).length === 0 && (
                      <p className="text-xs text-slate-400 sm:text-sm">
                        No effect information available.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}