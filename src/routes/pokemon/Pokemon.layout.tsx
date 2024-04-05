import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/Button";

export function PokemonLayout() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              <h4>Une erreur est survenue {error.message}</h4>
              <Button onClick={resetErrorBoundary}>Réessayer</Button>
            </div>
          )}
        >
          <Suspense fallback={<h1>Chargement...</h1>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
