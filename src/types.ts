export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  slug: string;
  stats: Stats;
  apiTypes: ApiType[];
  apiGeneration: number;
  apiResistances: ApiResistance[];
  resistanceModifyingAbilitiesForApi: ResistanceModifyingAbilitiesForApi[];
  apiEvolutions: ApiEvolution[];
  apiPreEvolution: string;
  apiResistancesWithAbilities: ApiResistancesWithAbilities[];
}

export interface Stats {
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface ApiType {
  name: PokemonType;
  image: string;
}

export interface ApiResistance {
  name: string;
  damage_multiplier: number;
  damage_relation: string;
}

export interface ApiEvolution {
  name: string;
  pokedexId: number;
}

export interface ApiResistancesWithAbilities {
  name: string;
  damage_multiplier: number;
  damage_relation: string;
}

export interface ResistanceModifyingAbilitiesForApi {
  name: string;
  slug: string;
}

export enum PokemonType {
  Normal = "Normal",
  Combat = "Combat",
  Vol = "Vol",
  Poison = "Poison",
  Sol = "Sol",
  Roche = "Roche",
  Insecte = "Insecte",
  Spectre = "Spectre",
  Acier = "Acier",
  Feu = "Feu",
  Eau = "Eau",
  Plante = "Plante",
  Électrik = "Électrik",
  Psy = "Psy",
  Glace = "Glace",
  Dragon = "Dragon",
  Ténèbres = "Ténèbres",
  Fée = "Fée",
}

export interface PokemonCardVariant {
  normal: boolean;
  reverse: boolean;
  holo: boolean;
  firstEdition: boolean;
}

export interface PokemonCard {
  id: string;
  localId: string | number;
  name: string;
  image: string;
  category: "Énergie" | "Pokémon" | "Dresseur";
  illustrator: string;
  rarity: string;
  variants: PokemonCardVariant;
  set: PokemonCardSet;
  dexId: number[];
  hp: number;
  types: string[];
  evolveFrom: string;
  description: string;
  stage: string;
}
export interface PokemonCardSet {
  id: string;
  name: string;
  logo: string;
  symbol: string;
  cardCount: {
    total: number;
    official: number;
  };
}
