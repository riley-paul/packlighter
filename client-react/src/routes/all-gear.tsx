import { getItems } from "@/api/item";
import AppHeader from "@/components/app-header";
import Loader from "@/components/base/loader";
import { DataTable } from "@/components/list-category/data-table";
import { Collections, ItemsResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useQuery } from "react-query";

const columns: ColumnDef<ItemsResponse>[] = [
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
    header: "Quantity",
    accessorKey: "quantity",
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
        <div className="overflow-auto">
          <DataTable columns={columns} data={itemsQuery.data} />
        </div>
      )}
      {itemsQuery.isLoading && <Loader />}
    </div>
  );
}
