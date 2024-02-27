import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  currentValue: string | undefined;
  onUpdate: (value: string | undefined) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ServerInput(props: Props): ReturnType<React.FC<Props>> {
  const { currentValue, onUpdate, ...rest } = props;

  const { handleSubmit, control } = useForm({
    defaultValues: { value: currentValue },
  });

  const onSubmit = handleSubmit(({ value }) => onUpdate(value));

  return (
    <form onSubmit={onSubmit} onBlur={onSubmit}>
      <Controller
        control={control}
        name="value"
        render={({ field }) => (
          <Input {...field} {...rest} autoComplete="off" />
        )}
      />
      <input type="submit" hidden />
    </form>
  );
}
