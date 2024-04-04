import { Outlet } from "react-router-dom";

export function CatalogueLayout() {
  return (
    <>
      <h2>Catalogue</h2>
      <Outlet />
    </>
  );
}
