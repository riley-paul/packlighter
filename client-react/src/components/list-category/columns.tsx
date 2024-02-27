import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ExpandedCategory, ExpandedCategoryItem } from "@/api/list";

const columnHelper = createColumnHelper<ExpandedCategoryItem>();

export const columns: ColumnDef<ExpandedCategoryItem>[] = [
  columnHelper.accessor((row) => row.itemData.name, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor((row) => row.itemData.description, {
    id: "description",
    header: "Description",
  }),
];
