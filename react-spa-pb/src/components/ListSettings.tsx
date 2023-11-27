import React from "react";
import { buttonVariants } from "./ui/button";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RecordModel } from "pocketbase";
import { useDataQuery } from "@/hooks/useDataQuery";

interface Props {
  list: RecordModel;
}

export const ListSettings: React.FC<Props> = (props) => {
  const { list } = props;
  const { updateList } = useDataQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>List Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={list.show_packed}
          onCheckedChange={(checked) =>
            updateList.mutate({ id: list.id, data: { show_packed: checked } })
          }
        >
          Show Packed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.show_images}
          onCheckedChange={(checked) =>
            updateList.mutate({ id: list.id, data: { show_images: checked } })
          }
        >
          Show Images
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.show_weights}
          onCheckedChange={(checked) =>
            updateList.mutate({ id: list.id, data: { show_weights: checked } })
          }
        >
          Show Weight
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.show_prices}
          onCheckedChange={(checked) =>
            updateList.mutate({ id: list.id, data: { show_prices: checked } })
          }
        >
          Show Prices
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
