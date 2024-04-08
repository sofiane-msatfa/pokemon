import { useState } from "react";
import { usePokedex } from "./usePokedex";
import { Pokemon, PokemonType } from "@/types";
import { normalizeText } from "@/utils/helpers";

export interface FiltersProps {
  search: string;
  pokemonTypes: PokemonType[];
  pokedexView: "all" | "inside" | "outside";
}

export const useFilters = () => {
  const { pokedex } = usePokedex();
  const [filters, setFilters] = useState<FiltersProps>({
    search: "",
    pokemonTypes: [],
    pokedexView: "all",
  });

  const setSearch = (search: string) => {
    const cleanSearch = normalizeText(search);
    setFilters({ ...filters, search: cleanSearch });
  };

  const setPokemonTypes = (types: PokemonType[]) => {
    setFilters({ ...filters, pokemonTypes: types });
  };

  const setPokedexView = (pokedexView: "all" | "inside" | "outside") => {
    setFilters({ ...filters, pokedexView });
  };

  const applyFilters = (pokemons: Pokemon[]) => {
    const pokemonFilteredByName = pokemons.filter((pokemon) => {
      const cleanPokemon = normalizeText(pokemon.name);
      const cleanSearch = normalizeText(filters.search ?? "");
      return cleanPokemon.includes(cleanSearch);
    });

    const pokemonFilteredByPokedex = pokemonFilteredByName.filter((pokemon) => {
      if (filters.pokedexView === "all") return true;
      if (filters.pokedexView === "inside") return pokedex.includes(pokemon.id);
      if (filters.pokedexView === "outside") return !pokedex.includes(pokemon.id);
    });

    return pokemonFilteredByPokedex.filter((pokemon) => {
      if (!filters.pokemonTypes.length) return true;
      return pokemon.apiTypes.some((type) => filters.pokemonTypes.includes(type.name));
    });
  };

  return {
    filters,
    setSearch,
    setPokemonTypes,
    setPokedexView,
    applyFilters,
  };
};
