<script lang="ts">
  import { useDeleteItem } from "@/hooks/useItem";
  import { cn } from "@/lib/utils";
  import type { ItemsResponse } from "@/lib/types";
  import DeleteButton from "./base/DeleteButton.svelte";
  import DragHandle from "./base/DragHandle.svelte";

  export let item: ItemsResponse;

  const deleteItem = useDeleteItem();
</script>

<div
  id={item.id}
  data-id={item.id}
  class="hover:bg-secondary/50 item flex items-center gap-2 p-2 pl-4 text-sm transition-colors"
>
  <div class="flex-1">
    <h3 class={cn(!item.name && "text-muted-foreground italic")}>
      {item.name || "Unnamed Item"}
    </h3>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
  <DeleteButton handleDelete={() => $deleteItem.mutate(item.id)} />
  <DragHandle />
</div>
