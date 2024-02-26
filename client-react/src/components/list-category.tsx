import { ExpandedCategory, ExpandedCategoryItem } from "@/api/list";
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";

const columnsDef: TableColumnDefinition<ExpandedCategoryItem>[] = [
  createTableColumn<ExpandedCategoryItem>({
    columnId: "name",
    renderHeaderCell: () => "Name",
    renderCell: (item) => item.itemData.name,
  }),
  createTableColumn<ExpandedCategoryItem>({
    columnId: "description",
    renderHeaderCell: () => "Description",
    renderCell: (item) => item.itemData.description,
  }),
];

import React from "react";

interface Props {
  category: ExpandedCategory;
}

export default function ListCategory(
  props: Props
): ReturnType<React.FC<Props>> {
  const { category } = props;

  return (
    <DataGrid items={category.items} columns={columnsDef} size="small">
      <DataGridHeader>
        <DataGridRow<ExpandedCategoryItem>>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<ExpandedCategoryItem>>
        {({ item, rowId }) => (
          <DataGridRow<ExpandedCategoryItem> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}
