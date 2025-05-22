import LoggedInNav from "./LoggedInNav";
import GuestNavbar from "./GuestNavbar";
import { useAuth } from "@/store/auth.store";
import { UserRole } from "@/types/enum.types";

const NormalNavbar = () => {
  const {isAuthenticated, role} = useAuth()
  return (
    <>
      {role === UserRole.CUSTOMER || role===UserRole.ANONYMOUS || role===UserRole.SELLER || role===UserRole.ADMIN? (<div className="w-full h-18 bg-red-400 px-10 flex justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl text-amber-50">BajarHub</h1>
        </div>
        <div className="flex gap-15 font-semibold text-amber-50 items-center">
          {isAuthenticated ? <LoggedInNav /> : <GuestNavbar />}
        </div>
      </div>): (<></>)}
    </>
  );
};

export default NormalNavbar;
