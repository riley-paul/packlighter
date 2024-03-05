import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = React.PropsWithChildren<{
  ctx: CellContext<unknown, unknown>;
}>;

const SortableHeader: React.FC<Props> = (props) => {
  const {
    ctx: { column },
    children,
  } = props;

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() &&
        (column.getIsSorted() === "asc" ? (
          <ArrowUp size="1rem" className="ml-2" />
        ) : (
          <ArrowDown size="1rem" className="ml-2" />
        ))}
    </Button>
  );
};

export default SortableHeader;
