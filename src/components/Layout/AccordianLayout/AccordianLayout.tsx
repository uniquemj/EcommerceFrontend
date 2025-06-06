import {
  Accordion,
} from "@/components/ui/accordion";
import type { Category } from "@/types/category.types";
import RenderAccordionItem from "./RenderAccordianItem";

interface AccordianLayoutProps {
  data: Category[];
}

const AccordianLayout = ({ data }: AccordianLayoutProps) => {
  return (
    <div>
      <div className="rounded-md border max-h-[400px] overflow-y-scroll p-4">
        {data.length < 1 && <p className="text-ternary-color text-center">Category List is empty</p>}
        <Accordion type="single" collapsible className="w-full">
          {data
            .filter((item) => !item.parent_category)
            .map((item) => (
              <RenderAccordionItem key={item._id} item={item} data={data}/>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordianLayout;
