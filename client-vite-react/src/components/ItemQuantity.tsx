import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  value: number;
  updateValue: (value: number) => void;
}

export const ItemQuantity: React.FC<Props> = (props) => {
  const { value, updateValue } = props;

  return (
    <div className="flex flex-col w-6">
      <Button
        className="h-5 p-0 rounded-b-none text-muted-foreground"
        onClick={() => updateValue(value + 1)}
        variant="ghost"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Input
        className="flex-1 text-sm p-0 text-center rounded-none active:outline-none"
        type="number"
        value={value}
        onChange={(e) => updateValue(Number(e.target.value))}
      />
      <Button
        className="h-5 p-0 rounded-t-none text-muted-foreground"
        onClick={() => updateValue(value > 1 ? value - 1 : 1)}
        variant="ghost"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};
