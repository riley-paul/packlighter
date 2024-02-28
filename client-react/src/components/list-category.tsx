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
import { GripVertical, Plus } from "lucide-react";
import DeleteButton from "./base/delete-button";

interface Props {
  category: ExpandedCategory;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-4 px-1">
            <GripVertical size="1rem" />
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
              <GripVertical size="1rem" />
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
  );
};

export default ListCategory;
