import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { RootLayout } from "./Root.layout";
import { PokemonLayout } from "./pokemon/Pokemon.layout";
import { Pokemon } from "./pokemon/Pokemon";
import { Pokedex } from "./pokedex/Pokedex";

export function createRouter() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={<PokemonLayout />}>
          <Route index element={<Pokemon />} />
        </Route>
        <Route path="pokedex" element={<Pokedex />} />
      </Route>,
    ),
  );
}
