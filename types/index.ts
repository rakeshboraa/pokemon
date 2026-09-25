export interface Pokemon {
  name: string;
  url: string;
}
export interface PokemonResponse {
  results: Pokemon[];
  count: number;
}

export interface SearchProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

