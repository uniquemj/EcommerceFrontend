import AppSidebar from "@/components/Navbar/SideNavbar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { DataType } from "@/types/navbar.typs";

type SideLayoutInterface = { children: React.ReactNode } & {
  data: DataType;
};

const SideLayout = ({ children, data }: SideLayoutInterface) => {
  return (
    <SidebarProvider >
      <AppSidebar data={data}/>
      <SidebarInset className="bg-background-color">
        <header className="flex h-16 shrink-0 items-center gap-2 ">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 bg-primary-color hover:bg-ternary-color hover:text-amber-50 hover:cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SideLayout;
