import SubTopNavbar from "./SubTopNavbar";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import SubDownNavbar from "./SubDownNavbar";
import { useState } from "react";

const NormalNavbar = () => {
  const route = useRouterState()
  const isAuthPage = route.location.pathname.includes('/auth')

  const [localKeyword, setLocalKeyword] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setLocalKeyword(e.target.value)
  }

  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    navigate({
      to: '/all',
      search:{
        keyword: localKeyword || undefined
      }
    })
    setLocalKeyword("")
  }

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
      {!isAuthPage && (
        <div className="flex justify-center min-sm:justify-between items-center max-sm:px-space-8 min-sm:px-space-42 border-b-1 py-space-18">
          <div className="hidden min-sm:block">
            <Link to='/'>
            <h1 className="text-32 font-bold text-secondary-shade-dark">
              BajarHub
            </h1>
            </Link>
          </div>
          <div className="w-90 min-940:w-150">
            <form className="flex items-center py-space-9 px-space-14 w-full border-1 rounded-80" onSubmit={handleSearchSubmit}>
              <Search className="text-secondary-500 w-space-20 h-space-20" />
              <Input
                type="text"
                value = {localKeyword}
                className="focus-visible:ring-[0px] selection:border-none selection:border-0 text-16 font-normal leading-space-24 border-none gap-space-9 text-gray-500 rounded-80"
                placeholder={`Search`}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="hidden min-sm:block">
            <Link to="/" className="flex items-center gap-2 text-14 hover:underline hover:text-secondary-shade-normal">
              <ShoppingCart size={20} className="text-secondary-shade-normal"/>
              Cart
            </Link>
          </div>
        </div>
      )}

      {!isAuthPage && (
        <SubDownNavbar/>
      )}
    </div>
  );
};

export default NormalNavbar;
