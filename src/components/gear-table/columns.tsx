import { Checkbox } from "@/components/ui/checkbox";
import { ItemsResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit2, MoreHorizontal } from "lucide-react";
import { formatWeight } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SortableHeader from "@/components/gear-table/sortable-header";
import { toast } from "sonner";
import ItemImage from "@/components/item-image";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ItemsResponse>[] = [
  {
    id: "selected",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
    enableSorting: false,
    enableResizing: false,
    size: 20,
  },
  {
    id: "image",
    cell: ({ row }) => (
      <div className={cn(!row.original.image && "absolute inset-2")}>
        <ItemImage item={row.original} />
      </div>
    ),
    size: 60,
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    accessorKey: "name",
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Description</SortableHeader>
    ),
    accessorKey: "description",
  },
  {
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Weight</SortableHeader>
      </div>
    ),
    accessorKey: "weight",
    cell: (ctx) => (
      <div className="text-right">
        {formatWeight(ctx.row.original.weight)} {ctx.row.original.weight_unit}
      </div>
    ),
  },
  {
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Price</SortableHeader>
      </div>
    ),
    accessorKey: "price",
    cell: (ctx) => <div className="text-right">${ctx.row.original.price}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(item.id);
                toast.success(`${item.name} ID copied to clipboard`);
              }}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>
                <Edit2 size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Duplicate
              <DropdownMenuShortcut>
                <Copy size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>
                <Delete size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    enableSorting: false,
    enableResizing: false,
    size: 32,
  },
];
