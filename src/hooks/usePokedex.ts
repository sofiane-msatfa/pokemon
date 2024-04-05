import { PokedexContext } from "@/context/Pokedex";
import { useContext } from "react";

export const usePokedex = () => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }
  return context;
};
