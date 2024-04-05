import type { Pokemon } from "@/types";

type RelativeUrl = `/${string}`;

async function request<T = unknown>(endpoint: RelativeUrl) {
  const baseUrl = "https://pokebuildapi.fr/api/v1";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return data as T;
}

export function getAllPokemon(limit?: number): Promise<Pokemon[]> {
  if (limit) {
    return request(`/pokemon/limit/${limit}`);
  }

  return request("/pokemon");
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  return request<Pokemon>(`/pokemon/${id}`);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  return request<Pokemon>(`/pokemon/${name}`);
}

export async function getAllPokemonFromGeneration(generation: number): Promise<Pokemon[]> {
  return request(`/pokemon/generation/${generation}`);
}

export async function getAllPokemonByType(type: string): Promise<Pokemon[]> {
  return request(`/pokemon/type/${type}`);
}
