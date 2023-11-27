import { RecordModel } from "pocketbase";
import React from "react";

interface Props {
  item: RecordModel;
}

export const Item: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <div className="text-sm">
      <h3 className="">{item.name}</h3>
      <p className="text-muted-foreground">{item.description}</p>
    </div>
  );
};
