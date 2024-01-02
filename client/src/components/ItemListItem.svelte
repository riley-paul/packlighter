<script lang="ts">
  import { useDeleteItem } from "@/hooks/useItem";
  import { cn } from "@/lib/utils";
  import type { ItemsResponse } from "@/lib/types";
  import DeleteButton from "./base/DeleteButton.svelte";
  import DragHandle from "./base/DragHandle.svelte";
  import { DRAGGABLE_CLASS } from "@/lib/constants";
  import { Item } from "./ui/dropdown-menu";

  export let item: ItemsResponse;

  const deleteItem = useDeleteItem();
</script>

<div
  id={item.id}
  data-id={item.id}
  class="{DRAGGABLE_CLASS} hover:bg-secondary/50 flex items-center gap-2 p-2 pl-4 text-sm transition-colors"
>
  <div class="flex-1">
    <h3 class={cn(!item.name && "text-muted-foreground italic")}>
      {item.name || "Unnamed Item"}
    </h3>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
  <div class="text-muted-foreground">
    {item.weight}{item.weight_unit || "g"}
  </div>
  <DeleteButton handleDelete={() => $deleteItem.mutate(item.id)} />
</div>
