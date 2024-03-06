import React from "react";
import { InputOption } from "./types";
import { Label } from "@fluentui/react-components";

export const getOptionLabel = (
  value: string | undefined,
  options: InputOption[]
) => {
  const option = options.find((o) => String(o.value) === String(value));
  return option?.label ?? value;
};

export const getFieldLabel = (
  label: string | undefined
): React.ReactElement | undefined => {
  if (!label) {
    return undefined;
  }
  return (
    <Label size="small" weight="semibold">
      {label}
    </Label>
  );
};
