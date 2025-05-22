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
      <SidebarInset >
        <header className="flex h-16 shrink-0 items-center gap-2 ">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 bg-red-400 hover:bg-red-200 hover:text-red-400 hover:cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SideLayout;
