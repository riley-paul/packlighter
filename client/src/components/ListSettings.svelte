<script lang="ts">
  import { Settings } from "lucide-svelte";
  import { Button } from "./ui/button";
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
  import { useUpdateList, type ListWithCategories } from "@/hooks/useList";

  export let list: ListWithCategories;

  $: updateList = useUpdateList();
  $: saveList = () => $updateList.mutate({ id: list.id, list });
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button builders={[builder]} size="icon" variant="outline" class="h-full">
      <Settings class="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>List Settings</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      bind:checked={list.show_packed}
      onCheckedChange={saveList}
    >
      Show Packed
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      bind:checked={list.show_images}
      onCheckedChange={saveList}
    >
      Show Images
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      bind:checked={list.show_weights}
      onCheckedChange={saveList}
    >
      Show Weight
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      bind:checked={list.show_prices}
      onCheckedChange={saveList}
    >
      Show Prices
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
