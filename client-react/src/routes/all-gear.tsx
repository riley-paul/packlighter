import { getItems } from "@/api/item";
import AppHeader from "@/components/app-header";
import Loader from "@/components/base/loader";
import { DataTable } from "@/components/gear-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Collections, ItemsResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit2, MoreHorizontal, Plus } from "lucide-react";
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

const columns: ColumnDef<ItemsResponse>[] = [
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
    header: "Image",
    cell: ({ row }) => <ItemImage item={row.original} />,
    size: 60,
  },
  {
    header: (ctx) => <SortableHeader ctx={ctx}>Name</SortableHeader>,
    accessorKey: "name",
  },
  {
    header: (ctx) => <SortableHeader ctx={ctx}>Description</SortableHeader>,
    accessorKey: "description",
  },
  {
    header: (ctx) => (
      <div className="text-right">
        <SortableHeader ctx={ctx}>Weight</SortableHeader>
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
    header: (ctx) => (
      <div className="text-right">
        <SortableHeader ctx={ctx}>Price</SortableHeader>
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

export default function GearPage(): ReturnType<React.FC> {
  const itemsQuery = useQuery({
    queryKey: [Collections.Items],
    queryFn: getItems,
  });

  return (
    <div className="h-screen flex flex-col">
      <AppHeader>
        <span className="font-semibold">Gear Catalogue</span>
        <div className="flex gap-4 items-center border-r pr-4">
          <Button>
            <Plus size="1rem" className="mr-2" />
            Add Item
          </Button>
        </div>
      </AppHeader>
      {itemsQuery.isSuccess && (
        <div className="overflow-auto px-4 py-2">
          <DataTable columns={columns} data={itemsQuery.data} />
        </div>
      )}
      {itemsQuery.isLoading && <Loader />}
    </div>
  );
}
