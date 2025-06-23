import BackButton from "@/components/Button/BackButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { AlignJustify } from "lucide-react";
import React from "react";

interface DashboardHeaderProps {
  header: string;
  children: React.ReactNode;
  buttons: React.ReactNode[];
  backurl?: string;
}

const DashboardHeader = ({
  header,
  children,
  buttons,
  backurl,
}: DashboardHeaderProps) => {
  return (
    <>
      {backurl ? (
        <div className="flex justify-start">
          <BackButton URL={backurl} />
        </div>
      ) : null}
      <div className="flex gap-3 my-4 justify-between items-center">
        <h1 className="max-[410px]:text-2xl text-3xl font-bold">{header}</h1>
        <div className="hidden min-940:flex gap-3 items-center">
          {buttons.length > 0
            ? buttons.map((button, index) => <div key={index}>{button}</div>)
            : null}
        </div>
        {buttons.length ? <div className="hidden max-940:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlignJustify />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {buttons.length > 0 &&
                buttons.map((button, index) => (
                  <DropdownMenuItem key={index}>
                    <div key={index}>{button}</div>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> : null}
      </div>
      <Separator className="bg-[rgba(0,0,0,0.3)]" />
      <div className="container mx-auto py-8 h-auto">{children}</div>
    </>
  );
};

export default DashboardHeader;
