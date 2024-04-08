import type { Pokemon, PokemonCard } from "@/types";

export async function getAllPokemon(): Promise<Pokemon[]> {
  const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon", {
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

export async function getPokemonCard(name: string): Promise<PokemonCard> {
  const response = await fetch(`https://api.tcgdex.net/v2/fr/cards/${name}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}
