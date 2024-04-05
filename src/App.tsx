import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useIsRestoring } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { queryClient, persister } from "@/utils/react-query";
import { Router } from "./router";

function PersistQueryClientGate({ children }: { children: React.ReactNode }) {
  const isRestoring = useIsRestoring();
  return isRestoring ? null : children;
}

export default function App() {
  return (
    <NextUIProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <PersistQueryClientGate>
          <Router />
        </PersistQueryClientGate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </PersistQueryClientProvider>
    </NextUIProvider>
  );
}
