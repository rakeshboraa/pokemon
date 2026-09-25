import { PokemonResponse } from "@/types";

const POKE_API_URL = "https://pokeapi.co/api/v2";

export async function getData(limit = 20,offset = 0): Promise<PokemonResponse> {
  const response = await fetch(`${POKE_API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }
  return response.json();
}
export function getImageUrl(id: string | number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
export function getDataId(url: string) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

