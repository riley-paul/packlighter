import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Collections,
  ListsResponse,
  ListsWeightUnitOptions,
} from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import actions from "@/actions";

interface Props {
  list: ListsResponse;
}

const ListSettings: React.FC<Props> = (props) => {
  const { list } = props;

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ListsResponse>) =>
      actions.lists.update({ id: list.id, list: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, list.id] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>List Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Default unit of mass</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={list.weight_unit}
              onValueChange={(value) =>
                updateMutation.mutate({
                  weight_unit: value as ListsWeightUnitOptions,
                })
              }
            >
              {Object.values(ListsWeightUnitOptions).map((massUnit) => (
                <DropdownMenuRadioItem value={massUnit} key={massUnit}>
                  {massUnit}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={list.show_packed}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              show_packed: checked,
            })
          }
        >
          Show Packed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.show_images}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              show_images: checked,
            })
          }
        >
          Show Images
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.show_weights}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              show_weights: checked,
            })
          }
        >
          Show Weight
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled
          checked={list.show_prices}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              show_prices: checked,
            })
          }
        >
          Show Prices
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListSettings;
