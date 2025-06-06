import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDeleteCategory } from "@/hooks/category.hooks";
import type { Category } from "@/types/category.types";
import { Link } from "@tanstack/react-router";
import { Edit, Trash2 } from "lucide-react";

interface RenderAccordianProps {
  item: Category;
  data: Category[];
}

const RenderAccordionItem = ({ item, data }: RenderAccordianProps) => {
  const children = data.filter(
    (child) => child.parent_category?._id === item._id
  );

  const { mutate} = useDeleteCategory()

  const handleDelete = (id: string) =>{
    mutate(id)
  }
  return (
    <AccordionItem key={item._id} value={item._id}>
      {children.length > 0 ? (
        <>
          <AccordionTrigger>
            <div className="flex justify-between w-full">
              <span>{item.title}</span>
              <div>
                <Link
                  to={`/admin/dashboard/categories/$id`}
                  params={{ id: item._id }}
                >
                  <Edit size={16} className="text-little-dark" />
                </Link>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="pl-4">
              {children.map((child) => (
                <RenderAccordionItem key={child._id} item={child} data={data} />
              ))}
            </Accordion>
          </AccordionContent>
        </>
      ) : (
        <div className="font-semibold py-4 flex justify-between w-full">
          <span>{item.title}</span>
          <div className="flex gap-4">
            <Link
              to={`/admin/dashboard/categories/$id`}
              params={{ id: item._id }}
            >
              <Edit size={16} className="text-secondary-little-dark"/>
            </Link>
            <Trash2 size={16} onClick={()=>handleDelete(item._id)} className="text-error-color hover:cursor-pointer"/>
          </div>
        </div>
      )}
    </AccordionItem>
  );
};

export default RenderAccordionItem;
