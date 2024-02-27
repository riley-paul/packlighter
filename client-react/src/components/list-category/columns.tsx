import { createColumnHelper } from "@tanstack/react-table";
import { ExpandedCategoryItem } from "@/api/list";
import { Checkbox } from "../ui/checkbox";

const columnHelper = createColumnHelper<ExpandedCategoryItem>();

export const columns = [
  columnHelper.accessor("packed", {
    cell: (ctx) => <Checkbox checked={ctx.getValue()} aria-label="pack item" />,
    header: () => <Checkbox aria-label="pack category" />,
  }),
  columnHelper.accessor((row) => row.itemData.name, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor((row) => row.itemData.description, {
    id: "description",
    header: "Description",
  }),
];
