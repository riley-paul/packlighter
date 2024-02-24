import { Field, Input, InputProps } from "@fluentui/react-components";
import React from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { ControlledInputProps, FieldOptions } from "./types";
import { getFieldLabel } from "./helpers";

type Props<
  T extends FieldValues,
  TFieldName extends Path<T>
> = ControlledInputProps<T, TFieldName> & FieldOptions & InputProps;

export default function ControlledTextInput<
  T extends FieldValues,
  TFieldName extends Path<T>
>(props: Props<T, TFieldName>): ReturnType<React.FC<Props<T, TFieldName>>> {
  const { label, name, control, required, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Field
      label={getFieldLabel(label)}
      required={required}
      validationMessage={error?.message}
      validationState={error ? "error" : "none"}
    >
      <Input {...field} {...rest} />
    </Field>
  );
}
