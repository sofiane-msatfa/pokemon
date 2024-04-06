import { usePokedex } from "@/hooks/usePokedex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "../pokemon/Pokemon.queries";
import { PokemonCard } from "@/components/PokemonCard";
import { Input, Pagination } from "@nextui-org/react";
import { useState } from "react";

function cleanPokemonName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

export function Pokedex() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const [search, setSearch] = useState("");
  const { pokemonIdList, resetPokedex } = usePokedex();
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const pokemonList = pokemons.filter((pokemon) => {
    return pokemonIdList.includes(pokemon.id);
  });

  const pokemonFilteredByName = pokemonList.filter((pokemon) => {
    const cleanPokemon = cleanPokemonName(pokemon.name);
    return cleanPokemon.includes(search.toLocaleLowerCase());
  });

  const paginatedPokemons = pokemonFilteredByName.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPages = Math.ceil(pokemonList.length / PAGE_SIZE);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Pokedex</h1>
      <div className="gap-4 flex flex-col sm:flex-row items-center justify-start my-4">
        <Input
          label="Chercher un Pokémon favori"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-1/2"
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={resetPokedex}>
          Reset Pokedex
        </button>
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {(pokemonList.length > 10) && (
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
