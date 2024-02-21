import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues, TFieldName extends Path<T>> = {
  control: Control<T>;
  name: TFieldName;
  label?: string;
  horizontal?: boolean;
};

export default function ControlledTextInput<
  T extends FieldValues,
  TFieldName extends Path<T>
>(props: Props<T, TFieldName>): ReturnType<React.FC<Props<T, TFieldName>>> {
  const { control, name, label, horizontal } = props;
  const { field, fieldState } = useController({ name, control });

  

  return null;
}
