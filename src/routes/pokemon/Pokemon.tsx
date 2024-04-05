import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "./Pokemon.queries";
import { Pagination, Input, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { PokemonCard } from "@/components/PokemonCard";
import { pokemonTypeArray } from "@/utils/pokemon";

function cleanPokemonName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

interface PokemonFilters {
  types: string[];
  pokedex: boolean;
  likes: boolean;
}

export function Pokemon() {
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [pokemonFilters, setpokemonFilters] = useState<PokemonFilters>({
    types: [],
    pokedex: false,
    likes: false,
  });

  const pokemonFilteredByType = pokemons.filter((pokemon) => {

    if (pokemonFilters.types.length === 0) {
      return true;
    }
    return pokemon.apiTypes.some((type) =>
      pokemonFilters.types.includes(type.name.toLowerCase())
    );
  });

  const pokemonFilteredByName = pokemonFilteredByType.filter((pokemon) => {
    const cleanPokemon = cleanPokemonName(pokemon.name);
    return cleanPokemon.includes(search.toLowerCase());
  });

  const paginatedPokemons = pokemonFilteredByName.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(pokemonFilteredByName.length / pageSize);

  function handleSetpokemonFilters(event: React.ChangeEvent<HTMLSelectElement>) {
    let types = event.target.value.split(',');
    if (types.includes('')) {
      types = []
    }

    setpokemonFilters({
      ...pokemonFilters,
      types: types
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Element catalogue</h1>
      <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-6 mb-4">
        <Input
          label="Chercher un Pokémon"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 sm:w-full"
        />
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
          value={pokemonFilters.types}
          onChange={handleSetpokemonFilters}
        >
          {Object.values(pokemonTypeArray).map((pokemonType) => (
            <SelectItem
              className="capitalize"
              key={pokemonType}
              value={pokemonType}
            >
              {pokemonType}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-center w-full">
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>

      <Pagination
        total={totalPages}
        initialPage={1}
        showControls
        onChange={(page) => setPage(page)}
        className="my-4"
      />
    </div>
  );
}
