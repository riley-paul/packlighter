import { ExpandedCategory } from "@/api/list";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import DeleteButton from "./base/delete-button";
import Gripper from "./base/gripper";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface Props {
  category: ExpandedCategory;
  isOverlay?: boolean;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category, isOverlay } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        isDragging && "opacity-30",
        isOverlay && "bg-card/70 border rounded"
      )}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4 px-1">
              <Gripper {...attributes} {...listeners} />
            </TableHead>
            <TableHead className="w-8">
              <Checkbox />
            </TableHead>
            <TableHead
              colSpan={2}
              className="text-foregound text-base font-semibold"
            >
              <h3>{category.name}</h3>
            </TableHead>
            <TableHead className="w-20">Weight</TableHead>
            <TableHead className="w-12">Qty</TableHead>
            <TableHead className="w-6">
              <DeleteButton handleDelete={() => {}} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-4 px-1">
                <Gripper />
              </TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{item.itemData.name}</TableCell>
              <TableCell className="text-muted-foreground w-1/2">
                {item.itemData.description}
              </TableCell>
              <TableCell>{item.itemData.weight}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="py-0">
                <DeleteButton handleDelete={() => {}} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Button variant="linkMuted" size="sm">
                <Plus size="1rem" className="mr-2" />
                Add Item
              </Button>
            </TableCell>
            <TableCell>100</TableCell>
            <TableCell>
              {category.items.reduce((acc, val) => acc + val.quantity, 0)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ListCategory;
