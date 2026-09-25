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



export interface PokemonResponse {
  results: Pokemon[];
  count: number;
}

export interface SearchProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export interface PokemonByName {
  base_experience: number;
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };

  types: {
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}
export type Move = {
  name: string;
  url: string;
};

export type MoveDetails = {
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
};