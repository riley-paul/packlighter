import React from "react";
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
import ListCategoryName from "./list-category-name";

interface Props {
  category: ExpandedCategory;
}

export default function ListCategory(
  props: Props
): ReturnType<React.FC<Props>> {
  const { category } = props;

  const columnsDef: TableColumnDefinition<ExpandedCategoryItem>[] =
    React.useMemo(
      () => [
        createTableColumn<ExpandedCategoryItem>({
          columnId: "name",
          renderHeaderCell: () => <ListCategoryName category={category} />,
          renderCell: (item) => item.itemData.name,
        }),
        createTableColumn<ExpandedCategoryItem>({
          columnId: "description",
          renderHeaderCell: () => null,
          renderCell: (item) => item.itemData.description,
        }),
        createTableColumn<ExpandedCategoryItem>({
          columnId: "weight",
          renderHeaderCell: () => "Weight",
          renderCell: (item) => item.itemData.weight,
        }),
        createTableColumn<ExpandedCategoryItem>({
          columnId: "quantity",
          renderHeaderCell: () => "Qty",
          renderCell: (item) => item.quantity,
        }),
      ],
      [category]
    );

  return (
    <DataGrid
      items={category.items}
      columns={columnsDef}
      size="small"
      getRowId={(item: ExpandedCategoryItem) => item.id}
    >
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
