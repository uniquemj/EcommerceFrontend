import { Outlet, createRootRouteWithContext, useRouterState } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";
import Footer from "@/components/Layout/Footer/Footer";

interface MyRouterContext{
  auth: typeof useAuth
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

const queryClient = new QueryClient()

function RootComponent() {
  const {role} = useAuth()
  const route = useRouterState()
  const isAuth = route.location.pathname.includes('/auth')

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <div className={isAuth ? "w-full h-screen": ""}>
        <Outlet />
        </div>
        {role == UserRole.CUSTOMER || role == UserRole.ANONYMOUS ? <Footer/> : null}
        <Toaster position="top-center" containerStyle = {{top: '80px'}} toastOptions={{duration: 2500}}/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
