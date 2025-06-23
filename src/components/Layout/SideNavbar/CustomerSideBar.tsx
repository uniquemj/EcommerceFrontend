import { Link } from "@tanstack/react-router";
import { LocationEdit, PackageSearch, UserCog } from "lucide-react";

const CustomerSideBar = () => {
  return (
    <div className="w-space-320 h-full bg-gray-50  flex justify-center px-space-24 py-space-24">
      <div className=" w-4/5 h-full flex flex-col gap-space-14">
        <div className="px-space-12 py-space-12 border-b-1">
          <Link to="/customer/profile" className="group/customer">
            <div className="flex gap-space-12 items-center">
              <UserCog size={16} className="text-secondary-shade-normal" />
              <h1 className="group-hover/customer:text-secondary-shade-normal group-[&.active]/customer:text-secondary-shade-normal">
                Manage Account
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-space-12 py-space-12 border-b-1">
          <Link to="/customer/order" className="group/customer">
            <div className="flex gap-space-12 items-center">
              <PackageSearch
                size={16}
                className="text-secondary-shade-normal"
              />
              <h1 className="group-hover/customer:text-secondary-shade-normal group-[&.active]/customer:text-secondary-shade-normal">
                My Order
              </h1>
            </div>
          </Link>
        </div>
        <div className="px-space-12 py-space-12 border-b-1">
          <Link to="/customer/address" className="group/customer">
            <div className="flex gap-space-12 items-center">
              <LocationEdit size={16} className="text-secondary-shade-normal" />
              <h1 className="group-hover/customer:text-secondary-shade-normal group-[&.active]/customer:text-secondary-shade-normal">
                Manage Address
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSideBar;
