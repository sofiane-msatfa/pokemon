import { usePokedex } from "@/hooks/usePokedex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "../pokemon/Pokemon.queries";
import { PokemonSearchDropdown } from "@/components/PokemonSearchDropdown";
import { PokemonCard } from "@/components/PokemonCard";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { paginate } from "@/utils/helpers";
import { useDebounceFn } from "@/hooks/useDebounceFn";

export function Pokedex() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const { filters, setSearch, applyFilters } = useFilters();
  const { pokedex, resetPokedex } = usePokedex();

  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const pokemonList = pokemons.filter((pokemon) => {
    return pokedex.includes(pokemon.id);
  });

  const getFilteredPokemons = () => {
    if (filters.search) {
      return applyFilters(pokemons);
    }

    return applyFilters(pokemonList);
  };

  const filteredPokemons = getFilteredPokemons();
  const paginatedPokemons = paginate(filteredPokemons, page, PAGE_SIZE);
  const totalPages = Math.ceil(pokemonList.length / PAGE_SIZE);

  const debounceSearch = useDebounceFn(setSearch, 100);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Pokedex</h1>
      <div className="gap-4 flex flex-col sm:flex-row items-center justify-start my-4">
        <PokemonSearchDropdown pokemons={pokemons} onSearch={debounceSearch} />
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={resetPokedex}>
          Reset Pokedex
        </button>
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {pokemonList.length > 10 && (
        <Pagination
          total={totalPages}
          initialPage={1}
          showControls
          onChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
}

