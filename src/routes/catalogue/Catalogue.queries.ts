import { queryOptions } from "@tanstack/react-query";
import { getAllPokemon } from "@/utils/api";

export const pokemonCatalogueQuery = () => {
  return queryOptions({
    queryKey: ["pokemons"],
    queryFn: () => getAllPokemon(),
  });
};
