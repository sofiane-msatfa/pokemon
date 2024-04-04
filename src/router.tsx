import { RouterProvider } from "react-router-dom";
import { useState } from "react";
import { createRouter } from "./routes";

export function Router() {
  const [router] = useState(() => createRouter());
  return <RouterProvider router={router} />;
}
