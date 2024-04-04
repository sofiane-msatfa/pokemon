import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "@/utils/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./router";
import { useIsRestoring } from "@tanstack/react-query";

function PersistQueryClientGate({ children }: { children: React.ReactNode }) {
  const isRestoring = useIsRestoring();
  return isRestoring ? null : children;
}

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <PersistQueryClientGate>
        <Router />
      </PersistQueryClientGate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </PersistQueryClientProvider>
  );
}
