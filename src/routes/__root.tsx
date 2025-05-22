import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";

interface MyRouterContext{
  auth: typeof useAuth
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

const queryClient = new QueryClient()

function RootComponent() {
  const {role} = useAuth()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <div className={role==UserRole.CUSTOMER || role == UserRole.ANONYMOUS ? "w-full h-screen-minus": ""}>
        <Outlet />
        <Toaster position="top-right" containerStyle = {{top: '80px'}} toastOptions={{duration: 2500}}/>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
