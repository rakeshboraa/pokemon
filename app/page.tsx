import { getData } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import PokemonSearch from "@/components/PokemonSearch";
import { SearchProps } from "@/types";

const Page = async ({ searchParams }: SearchProps) => {
  const params = await searchParams;
  const search = params.search?.trim().toLowerCase() || "";
  const data = await getData(50, 0);
  const filteredPokemon = search ? data.results.filter((pokemon) => pokemon.name.toLowerCase().includes(search)): data.results.slice(0, 20);
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PokemonSearch />
        {filteredPokemon.length > 0 ? (
          <div key={search} className="grid grid-cols-1 gap-5 transition-all duration-500 ease-out sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredPokemon.map((pokemon, index) => (
              <PokemonCard key={`${search}-${pokemon.name}`} name={pokemon.name} url={pokemon.url} index={index} />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in-scale py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              No Data Found
            </h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;