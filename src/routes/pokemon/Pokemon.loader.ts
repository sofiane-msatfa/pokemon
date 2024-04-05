import { queryClient } from "@/utils/react-query";
import { getPokemonQuery } from "./Pokemon.queries";

export const pokemonLoader = async () => {
  await queryClient.ensureQueryData(getPokemonQuery());
  return null;
};
