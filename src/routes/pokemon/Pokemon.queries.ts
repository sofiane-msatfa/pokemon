import { queryOptions } from "@tanstack/react-query";
import { getAllPokemon } from "@/utils/api";

export const getPokemonQuery = () => {
  return queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
  });
};
