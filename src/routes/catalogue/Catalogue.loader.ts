import { queryClient } from "@/utils/react-query";
import { pokemonCatalogueQuery } from "./Catalogue.queries";

export const catalogueLoader = async () => {
  await queryClient.ensureQueryData(pokemonCatalogueQuery());
  return null;
};
