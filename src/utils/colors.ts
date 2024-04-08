import { Pokemon, PokemonType } from "@/types";
import { partition } from "./helpers";

type PokemonTypeColorMap = {
  [key in PokemonType]: string;
};

export const pokemonTypeColorMap: PokemonTypeColorMap = {
  [PokemonType.Normal]: "border-gray-800 hover:border-gray-800",
  [PokemonType.Feu]: "border-red-800 hover:border-red-800",
  [PokemonType.Eau]: "border-blue-800 hover:border-blue-800",
  [PokemonType.Électrik]: "border-yellow-800 hover:border-yellow-800",
  [PokemonType.Plante]: "border-green-800 hover:border-green-800",
  [PokemonType.Glace]: "border-blue-800 hover:border-blue-800",
  [PokemonType.Psy]: "border-pink-800 hover:border-pink-800",
  [PokemonType.Insecte]: "border-green-800 hover:border-green-800",
  [PokemonType.Roche]: "border-gray-800 hover:border-gray-800",
  [PokemonType.Spectre]: "border-purple-800 hover:border-purple-800",
  [PokemonType.Dragon]: "border-indigo-800 hover:border-indigo-800",
  [PokemonType.Ténèbres]: "border-gray-800 hover:border-gray-800",
  [PokemonType.Acier]: "border-gray-800 hover:border-gray-800",
  [PokemonType.Combat]: "border-red-800 hover:border-red-800",
  [PokemonType.Fée]: "border-pink-800 hover:border-pink-800",
  [PokemonType.Poison]: "border-purple-800 hover:border-purple-800",
  [PokemonType.Sol]: "border-yellow-800 hover:border-yellow-800",
  [PokemonType.Vol]: "border-blue-800 hover:border-blue-800",
};

export const pokemonSecondaryTypes = [
  PokemonType.Combat,
  PokemonType.Fée,
  PokemonType.Poison,
  PokemonType.Sol,
  PokemonType.Vol,
];

export function getPokemonBorderColorByType(pokemon: Pokemon) {
  const pokemonTypes = pokemon.apiTypes.map((type) => type.name);
  const [primaryTypes, secondaryTypes] = partition(
    pokemonTypes,
    (type) => !pokemonSecondaryTypes.includes(type),
  );

  if (primaryTypes[0]) {
    return pokemonTypeColorMap[primaryTypes[0]];
  }

  if (secondaryTypes[0]) {
    return pokemonTypeColorMap[secondaryTypes[0]];
  }

  return "border-gray-800 hover:border-gray-800";
}
