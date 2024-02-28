import { getItems } from "@/api/item";
import AppHeader from "@/components/app-header";
import Loader from "@/components/base/loader";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Collections, ItemsResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useQuery } from "react-query";

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
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Weight",
    accessorKey: "weight",
    cell: (ctx) => (
      <span>
        {ctx.row.original.weight}
        {ctx.row.original.weight_unit}
      </span>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
  },
];

export default function GearPage(): ReturnType<React.FC> {
  const itemsQuery = useQuery({
    queryKey: [Collections.Items],
    queryFn: getItems,
  });

  return (
    <div className="h-screen flex flex-col">
      <AppHeader>Gear Catalogue</AppHeader>
      {itemsQuery.isSuccess && (
        <div className="overflow-auto px-4 py-2">
          <DataTable columns={columns} data={itemsQuery.data} />
        </div>
      )}
      {itemsQuery.isLoading && <Loader />}
    </div>
  );
}
