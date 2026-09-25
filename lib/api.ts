import { PokemonByName, PokemonResponse } from "@/types";

const API_URL = "https://pokeapi.co/api/v2";

export async function getData(limit = 20,offset = 0): Promise<PokemonResponse> {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
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

export async function getPokemon(name: string): Promise<PokemonByName> {
  const response = await fetch(`${API_URL}/pokemon/${name.toLowerCase()}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Pokémon not found");
  }

  return response.json() as Promise<PokemonByName>;
}

export function getPokemonId(url: string) {
  return url.split("/").filter(Boolean).pop();
}
export const formatName = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};