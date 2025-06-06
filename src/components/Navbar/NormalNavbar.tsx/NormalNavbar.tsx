import LoggedInNav from "./LoggedInNav";
import GuestNavbar from "./GuestNavbar";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";
import SubTopNavbar from "./SubTopNavbar";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import SubDownNavbar from "./SubDownNavbar";

const NormalNavbar = () => {
  const { isAuthenticated} = useAuth();
  return (
    <div className="flex flex-col">
      <div className="">
        <SubTopNavbar />
        {/* <div className="flex items-center">
          <h1 className="font-bold text-3xl text-text-color">BajarHub</h1>
        </div>
        <div className="flex gap-15 font-semibold text-text-color items-center">
          {isAuthenticated ? <LoggedInNav /> : <GuestNavbar />}
        </div> */}
      </div>
      {isAuthenticated && (
        <div className="flex justify-center min-sm:justify-between items-center max-sm:px-space-8 min-sm:px-space-42 border-b-1 py-space-18">
          <div className="hidden min-sm:block">
            <h1 className="text-32 font-bold text-secondary-shade-dark">
              BajarHub
            </h1>
          </div>
          <div className="w-90 min-940:w-150">
            <div className="flex items-center py-space-9 px-space-14 w-full border-1 rounded-80">
              <Search className="text-secondary-500 w-space-20 h-space-20" />
              <Input
                type="text"
                className="focus-visible:ring-[0px] selection:border-none selection:border-0 text-16 font-normal leading-space-24 border-none gap-space-9 text-gray-500 rounded-80"
                placeholder={`Search`}
              />
            </div>
          </div>
          <div className="hidden min-sm:block">
            <Link to="/" className="flex items-center gap-2 text-14 hover:underline hover:text-secondary-shade-normal">
              <ShoppingCart size={20} className="text-secondary-shade-normal"/>
              Cart
            </Link>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <SubDownNavbar/>
      )}
    </div>
  );
};

export default NormalNavbar;
