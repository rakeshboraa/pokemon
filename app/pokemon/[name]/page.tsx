import Image from "next/image";
import Link from "next/link";
import BaseStats from "@/components/BaseStats";
import NotFound from "@/components/NotFound";
import PokemonMoves from "@/components/PokemonMoves";
import PokemonStat from "@/components/PokemonStat";
import {
  formatName,
  getImageUrl,
  getPokemon,
  TYPE_COLORS,
} from "@/lib/api";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    return <NotFound />;
  }

  return (
    <main className="mx-auto min-h-90vh w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="pokemon-card">
        <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-yellow-200 bg-white px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 sm:px-4"
          >
            <span aria-hidden="true">←</span>
            Back
          </Link>

          <h1 className="min-w-0 truncate text-2xl font-extrabold capitalize tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
            {pokemon.name}
          </h1>
        </header>

        <section className="relative mb-6 overflow-hidden rounded-2xl border-2 border-sky-200 bg-linear-to-b from-sky-100 via-white to-blue-50 p-4 shadow-sm sm:mb-8 sm:p-6 lg:p-8">
          <div className="relative z-10 grid gap-8 md:gap-10 lg:grid-cols-3 lg:items-center">
            <div className="flex flex-col items-center">
              <div className="pokemon-image-container">
                <div className="pokemon-image-glow" />

                <Image
                  src={getImageUrl(pokemon.id)}
                  alt={formatName(pokemon.name)}
                  width={280}
                  height={280}
                  priority
                  className="pokemon-image"
                />
              </div>

              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="pokemon-type"
                    style={{
                      backgroundColor: TYPE_COLORS[type.name] ?? "#777",
                    }}
                  >
                    {formatName(type.name)}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full min-w-0">
              <BaseStats stats={pokemon.stats} />
            </div>

            <div className="w-full min-w-0 space-y-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <PokemonStat
                  label="Height"
                  value={`${pokemon.height / 10} m`}
                  borderColor="border-sky-100"
                />

                <PokemonStat
                  label="Weight"
                  value={`${pokemon.weight / 10} kg`}
                  borderColor="border-emerald-100"
                />

                <PokemonStat
                  label="Base XP"
                  value={pokemon.base_experience}
                  borderColor="border-purple-100"
                />

                <PokemonStat
                  label="Abilities"
                  value={pokemon.abilities.length}
                  borderColor="border-orange-100"
                />
              </div>

              <div>
                <h2 className="mb-2 text-sm font-semibold text-slate-500">
                  Abilities
                </h2>

                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(({ ability }) => (
                    <span
                      key={ability.name}
                      className="pokemon-ability"
                    >
                      {formatName(ability.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label={`Moves (${pokemon.moves.length})`}>
          <PokemonMoves moves={pokemon.moves} />
        </section>
      </div>
    </main>
  );
}