import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>Hello "__root"!</div>
        <Outlet />
        <Toaster position="top-right" toastOptions={{duration: 2500}}/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
