"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RealtimeProvider } from "@upstash/realtime/client";
import { useState } from "react";
import { SerwistProvider } from "@serwist/turbopack/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SerwistProvider swUrl="/sw.ts">
      <RealtimeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RealtimeProvider>
    </SerwistProvider>
  );
};
