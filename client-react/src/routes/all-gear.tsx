import { getItems, updateItem } from "@/api/item";
import AppHeader from "@/components/app-header";
import Loader from "@/components/base/loader";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Collections, ItemsResponse } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { queryClient } from "@/lib/query";
import ServerInput from "@/components/input/server-input";

export default function GearPage(): ReturnType<React.FC> {
  const itemsQuery = useQuery({
    queryKey: [Collections.Items],
    queryFn: getItems,
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries([Collections.Items]);
      const previousItems = queryClient.getQueryData<ItemsResponse[]>([
        Collections.Items,
      ]);
      queryClient.setQueryData<ItemsResponse[]>(
        [Collections.Items],
        (old) =>
          old?.map((item) =>
            item.id === variables.id ? { ...item, ...variables.item } : item
          ) ?? []
      );
      return { previousItems };
    },
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([Collections.Items], context.previousItems);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Items]);
    },
  });

  const columns = React.useMemo<ColumnDef<ItemsResponse>[]>(
    () => [
      {
        id: "selected",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        size: 0,
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (ctx) => (
          <ServerInput
            currentValue={ctx.row.original.name}
            onUpdate={(name) =>
              updateMutation.mutate({ id: ctx.row.original.id, item: { name } })
            }
          />
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (ctx) => (
          <ServerInput
            currentValue={ctx.getValue() as string}
            onUpdate={(description) =>
              updateMutation.mutate({
                id: ctx.row.original.id,
                item: { description },
              })
            }
          />
        ),
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
    ],
    [updateMutation]
  );

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
