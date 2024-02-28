import { ItemsResponse } from "@/lib/types";
import React from "react";
import DeleteButton from "./base/delete-button";

interface Props {
  item: ItemsResponse;
}

const PackingItem: React.FC<Props> = (props) => {
  const { item } = props;

  return (
    <div className="flex gap-2 items-center w-full text-sm hover:bg-muted px-4 py-2">
      <div className="flex flex-col flex-1">
        <span>{item.name || "Unnamed Gear"}</span>
        <span className="text-muted-foreground">{item.description}</span>
      </div>
      <span className="text-muted-foreground">
        {item.weight}
        {item.weight_unit}
      </span>
      <DeleteButton handleDelete={() => console.log("delete", item.id)} />
    </div>
  );
};

export default PackingItem;
