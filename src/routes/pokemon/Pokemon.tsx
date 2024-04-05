import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "./Pokemon.queries";

import { Button, Card, CardBody, CardFooter, Chip, Image, Input } from "@nextui-org/react";
import { PokemonCard } from "@/components/PokemonCard";

export function Pokemon() {
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.includes(search))
    .slice((page - 1) * pageSize, page * pageSize);


  

  console.log(filteredPokemons[0].apiTypes)
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
          {filteredPokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </div>
      </div>


      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Précédent
      </Button>
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page * pageSize >= pokemons.length}
      >
        Suivant
      </Button>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
