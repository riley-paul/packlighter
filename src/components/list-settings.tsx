import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useMutation } from "@tanstack/react-query";
import { CacheKeys, queryClient } from "@/lib/query";
import type { List } from "@/db/schema";
import { trpc } from "@/client";
import { weightUnits, type WeightUnit } from "@/db/enums";

interface Props {
  list: List;
}

const ListSettings: React.FC<Props> = (props) => {
  const { list } = props;

  const updateMutation = useMutation({
    mutationFn: (data: Partial<List>) =>
      trpc.lists.update.mutate({ id: list.id, value: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, list.id] });
    },
  });

  const unpackMutation = useMutation({
    mutationFn: () => trpc.lists.unpack.mutate(list.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, list.id] });
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
              value={list.weightUnit}
              onValueChange={(value) =>
                updateMutation.mutate({
                  weightUnit: value as WeightUnit,
                })
              }
            >
              {Object.values(weightUnits).map((unit) => (
                <DropdownMenuRadioItem value={unit} key={unit}>
                  {unit}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={list.showPacked}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              showPacked: checked,
            })
          }
        >
          Show Packed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.showImages}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              showImages: checked,
            })
          }
        >
          Show Images
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={list.showWeights}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              showWeights: checked,
            })
          }
        >
          Show Weight
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled
          checked={list.showPrices}
          onCheckedChange={(checked) =>
            updateMutation.mutate({
              showPrices: checked,
            })
          }
        >
          Show Prices
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => unpackMutation.mutate()}>
          Unpack everything
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  );
};

export default ListSettings;
