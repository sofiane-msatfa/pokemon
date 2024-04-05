import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "./Pokemon.queries";

import { Pagination, Input } from "@nextui-org/react";
import { PokemonCard } from "@/components/PokemonCard";

function cleanPokemonName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

export function Pokemon() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const pokemonFilteredByName = pokemons.filter((pokemon) => {
    const cleanPokemon = cleanPokemonName(pokemon.name);
    return cleanPokemon.includes(search.toLocaleLowerCase());
  });

  const paginatedPokemons = pokemonFilteredByName.slice((page - 1) * pageSize, page * pageSize);

  const totalPages = Math.ceil(pokemonFilteredByName.length / pageSize);

  return (
    <div>
      <h1 className="text-lg font-bold my-2">Element catalogue</h1>
      <Input
        label="Chercher un Pokémon"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-1/2"
      />
      <div className="flex justify-center sm:block">
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
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
      />
      <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
