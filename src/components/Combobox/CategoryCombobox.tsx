import type { Category } from "@/types/category.types"
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem } from "../ui/command";
import { CommandGroup } from "cmdk";

interface CategoryComboboxProps{
  categories: Category[];
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

const CategoryCombobox = ({categories, isLoading, value, onChange}: CategoryComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchItem, setSearchItem] = React.useState("");

  const selectedCategory = categories?.find((c)=> c._id == value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
        variant={"outline"}
        role="combobox"
        aria-expanded={open}
        className=" justify-between font-normal text-gray-500"
        >
          {selectedCategory ? selectedCategory.title : "Select parent category"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 h-[250px]">
        <Command className="absolute right-0 z-1000">
          <CommandInput placeholder="Search Categories . . ." value={searchItem} onValueChange={setSearchItem}/>
          <CommandEmpty>No Categories found.</CommandEmpty>
          <CommandGroup className="overflow-y-scroll">
            {isLoading ? (<CommandItem disabled>Loading . . .</CommandItem>):
            (
              categories.map((cat) => (
                <CommandItem key={cat._id} onSelect={
                  ()=>{
                    onChange(cat._id);
                    setOpen(false);
                    setSearchItem("")
                  }
                }>
                  {cat.title}
                </CommandItem>
              ))
            )
            }
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryCombobox