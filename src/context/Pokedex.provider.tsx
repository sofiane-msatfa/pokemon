import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PokedexContext } from "./Pokedex";

export function PokedexProvider({ children }: { children: React.ReactNode }) {
  const [pokedex, setPokedex] = useLocalStorage<number[]>("pokedex", []);

  const addPokemonToPokedex = (id: number) => {
    setPokedex([...pokedex, id]);
  };

  const removePokemonFromPokedex = (id: number) => {
    setPokedex(pokedex.filter((p) => p !== id));
  };

  const resetPokedex = () => {
    setPokedex([]);
  };

  return (
    <PokedexContext.Provider
      value={{
        pokedex,
        addPokemonToPokedex,
        removePokemonFromPokedex,
        resetPokedex,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
