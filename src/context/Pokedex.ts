import { createContext } from "react";

interface PokedexContext {
  pokedex: number[];
  addPokemonToPokedex: (id: number) => void;
  removePokemonFromPokedex: (id: number) => void;
  resetPokedex: VoidFunction;
}

export const PokedexContext = createContext<PokedexContext | undefined>(undefined);
