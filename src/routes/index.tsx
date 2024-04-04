import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home/Home";
import Catalogue from "./catalogue/Catalogue";
import { CatalogueLayout } from "./catalogue/Catalogue.layout";
import { HomeLayout } from "./home/Home.layout";

export function createRouter() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="catalogue" element={<CatalogueLayout />}>
          <Route index element={<Catalogue />} />
        </Route>
      </Route>
    )
  );
}
