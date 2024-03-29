"use client";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
// @ts-ignore
import { trpc } from "./client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// @ts-ignore
export default function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
