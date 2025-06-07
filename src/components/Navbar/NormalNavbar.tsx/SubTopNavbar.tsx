import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLogout } from "@/hooks/auth.hooks";
import { useAuth } from "@/store/auth.store";
import { Link, useRouterState} from "@tanstack/react-router";
import {
  EllipsisVertical,
  LogIn,
  LogOut,
  PackageSearch,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";


const SubNavbar = () => {
  const { isAuthenticated } = useAuth();
  const { mutate } = useLogout();
  const { role } = useAuth();

  const handleLogout = () => {
    mutate(role);
  };
  const route = useRouterState()
  const isAuthPage = route.location.pathname.includes('/auth')
  return (
    <div>
      {/* Desktop */}
      <div className="hidden w-full px-space-42 h-space-42 min-sm:flex justify-between bg-primary-100 border-b-1">
        <div className="flex ">
          {!isAuthPage ? (
            <div className="flex justify-start items-center ">
              <h1 className="text-14 font-normal text-primary-300">
                Welcome to BajarHub
              </h1>
            </div>) :
            (<div className="flex items-center">
              <Link to='/'>
                <h1 className="text-20 font-bold text-secondary-shade-dark">
                  BajarHub
                </h1>
              </Link>
            </div>)
          }
        </div>
        <div className="flex justify-end items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-space-24">
              <Link
                to="/"
                className="hover:underline hover:text-secondary-shade-normal flex gap-2 justify-end items-center text-14 font-normal text-primary-300"
              >
                <PackageSearch size={14} className="text-secondary-shade-normal"/>
                Track your order
              </Link>
              <Link
                to="/customer/profile"
                className="hover:underline hover:text-secondary-shade-normal flex gap-2 justify-end items-center text-14 font-normal text-primary-300"
              >
                <User size={14} className="text-secondary-shade-normal"/>
                My Account
              </Link>
              <div
                className="hover:underline hover:text-secondary-shade-normal flex gap-2 justify-end items-center text-14 font-normal hover:cursor-pointer text-primary-300"
                onClick={handleLogout}
              >
                <LogOut size={14} className="text-secondary-shade-normal"/>
                Logout
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-space-24">
              <Link
                to="/auth/seller/login"
                className="hover:underline hover:text-secondary-shade-normal flex gap-2 justify-end items-center text-14 text-primary-300 font-normal"
              >
                <Store size={14} className="text-secondary-shade-normal" />
                Become a Seller
              </Link>
              <Link
                to="/auth/login"
                className="flex gap-2 items-center justify-end hover:underline hover:text-secondary-shade-normal text-14 text-primary-300 font-normal"
              >
                <LogIn size={14} className="text-secondary-shade-normal" />
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="hidden max-sm:flex justify-between px-space-14 py-space-24 border-b-1">
        <div>
          <h1 className="text-20 font-bold text-secondary-shade-dark">
            BajarHub
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Link to="/">
              <ShoppingCart size={19} className="text-secondary-shade-normal"/>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              {isAuthenticated && (
                <>
                  <DropdownMenuLabel className="font-normal text-12">
                    Welcome to BajarHub
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuGroup>
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link
                        to="/"
                        className="hover:underline flex gap-2 justify-end items-center text-14 font-normal text-secondary-shade-normal"
                      >
                        <PackageSearch size={14} />
                        Track your order
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link
                        to="/customer/profile"
                        className="hover:underline flex gap-2 justify-end items-center text-14 font-normal text-secondary-shade-normal"
                      >
                        <User size={14} />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div
                        className="hover:underline flex gap-2 justify-end items-center text-14 font-normal hover:cursor-pointer text-secondary-shade-normal"
                        onClick={handleLogout}
                      >
                        <LogOut size={14} />
                        Logout
                      </div>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="group/item">
                      <Link
                        to="/auth/seller/login"
                        className="hover:underline flex gap-2 justify-end items-center text-14 text-primary-300 font-normal"
                      >
                        <Store
                          size={14}
                          className="text-secondary-shade-normal"
                        />
                        Become a Seller
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/auth/login"
                        className="flex gap-2 items-center justify-end hover:underline text-14 text-primary-300 font-normal"
                      >
                        <LogIn
                          size={14}
                          className="text-secondary-shade-normal"
                        />
                        Login
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
