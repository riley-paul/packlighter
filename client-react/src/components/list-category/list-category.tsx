import React from "react";
import { ExpandedCategory } from "@/api/list";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
  category: ExpandedCategory;
}

export default function ListCategory(
  props: Props
): ReturnType<React.FC<Props>> {
  const { category } = props;

  return <DataTable columns={columns} data={category.items} />;
}
