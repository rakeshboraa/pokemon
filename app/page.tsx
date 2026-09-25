import { getData } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import PokemonSearch from "@/components/PokemonSearch";
import { SearchProps } from "@/types";
import NotFound from "@/components/NotFound";

const Page = async ({ searchParams }: SearchProps) => {
  const params = await searchParams;
  const search = params.search?.trim().toLowerCase() || "";
  const data = await getData(50, 0);

  const filteredPokemon = search ? data.results.filter((pokemon) => pokemon.name.toLowerCase().includes(search)) : data.results.slice(0, 20);

  return (
    <main className="min-h-screen">
      <h2 className="px-4 py-4 text-center text-2xl font-semibold text-black sm:text-3xl">
        Pokemon
      </h2>

      <div className="mx-auto w-full max-w-7xl px-3 pb-10 sm:px-5 lg:px-8">
        <PokemonSearch />

        {filteredPokemon.length > 0 ? (
          <div
            key={search}
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {filteredPokemon.map((pokemon, index) => (
              <PokemonCard
                key={`${search}-${pokemon.name}`}
                name={pokemon.name}
                url={pokemon.url}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in-scale px-4 py-16 text-center sm:py-20">
            <NotFound />
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;