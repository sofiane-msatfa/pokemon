import { createContext } from "react";

interface PokedexContext {
  pokemonIdList: number[];
  addPokemonToPokedex: (id: number) => void;
  removePokemonFromPokedex: (id: number) => void;
  resetPokedex: VoidFunction;
}

export const PokedexContext = createContext<PokedexContext | undefined>(undefined);
