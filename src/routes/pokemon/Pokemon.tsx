import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "./Pokemon.queries";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { PokemonCard } from "@/components/PokemonCard";
import { paginate } from "@/utils/helpers";
import { useFilters } from "@/hooks/useFilters";
import { PokemonType } from "@/types";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { PokemonSearchDropdown } from "@/components/PokemonSearchDropdown";

export function Pokemon() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { filters, setSearch, setPokemonTypes, setPokedexView, applyFilters } = useFilters();
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const filteredPokemons = applyFilters(pokemons);
  const paginatedPokemons = paginate(filteredPokemons, page, pageSize);
  const totalPages = Math.ceil(filteredPokemons.length / pageSize);

  const debounceSearch = useDebounceFn(setSearch, 300);

  const handleSetpokemonFilters = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const types = event.target.value.split(",").filter(Boolean) as PokemonType[];
    if (!types.length) return setPokemonTypes([]);
    setPokemonTypes(types);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Element catalogue</h1>
      <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-6 mb-4">
        <PokemonSearchDropdown pokemons={pokemons} onSearch={debounceSearch} />
        <Select
          value={pageSize}
          label="Sélectionner le nombre d'éléments à afficher"
          className="w-1/2 sm:w-full"
          selectionMode="single"
          color="default"
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <SelectItem key={10} value="10">
            10
          </SelectItem>
          <SelectItem key={20} value="20">
            20
          </SelectItem>
          <SelectItem key={50} value="50">
            50
          </SelectItem>
        </Select>
        <Select
          label="Choisissez un type de Pokémon"
          selectionMode="multiple"
          className="w-1/2 sm:w-full"
          value={filters.pokemonTypes}
          onChange={handleSetpokemonFilters}
        >
          {Object.values(PokemonType).map((pokemonType) => (
            <SelectItem className="capitalize" key={pokemonType} value={pokemonType}>
              {pokemonType}
            </SelectItem>
          ))}
        </Select>
        <Select
          value={pageSize}
          label="Pokedex"
          className="w-1/2 sm:w-full"
          selectionMode="single"
          color="default"
          onChange={(e) => {
            const selectedValue = e.target.value as "all" | "inside" | "outside";
            setPokedexView(selectedValue);
          }}
        >
          <SelectItem key="all">all</SelectItem>
          <SelectItem key="outside">Not in</SelectItem>
          <SelectItem key="inside">In</SelectItem>
        </Select>
      </div>
      <div className="flex justify-center w-full">
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>

      <Pagination
        total={totalPages}
        initialPage={1}
        showControls
        className="my-4"
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}

