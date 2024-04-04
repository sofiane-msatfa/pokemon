import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonCatalogueQuery } from "./Catalogue.queries";
import { useState } from "react";

export default function Catalogue() {
  const { data: pokemons } = useSuspenseQuery(pokemonCatalogueQuery());

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.includes(search))
    .slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h1>Element catalogue</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Précédent
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page * pageSize >= pokemons.length}
      >
        Suivant
      </button>
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
