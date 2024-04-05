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
  name: Type;
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

export interface PokemonType {
  id: number;
  name: string;
  image: string;
  englishName: string;
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

export enum Type {
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
