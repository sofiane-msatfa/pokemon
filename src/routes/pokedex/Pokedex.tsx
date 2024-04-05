import { usePokedex } from "@/hooks/usePokedex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPokemonQuery } from "../pokemon/Pokemon.queries";
import { PokemonCard } from "@/components/PokemonCard";

export function Pokedex() {
  const { pokemonIdList, resetPokedex } = usePokedex();
  const { data: pokemons } = useSuspenseQuery(getPokemonQuery());

  const pokemonList = pokemons.filter((pokemon) => {
    return pokemonIdList.includes(pokemon.id);
  });

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center">Pokedex</h1>
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={resetPokedex}>
          Reset Pokedex
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
