<script lang="ts">
  import { GripVertical, X } from "lucide-svelte";
  import { Button } from "./ui/button";
  import { useDeleteItem } from "@/hooks/useItem";
  import { cn } from "@/lib/utils";
  import type { ItemsResponse } from "@/lib/types";
  import DeleteButton from "./DeleteButton.svelte";

  export let item: ItemsResponse;

  const deleteItem = useDeleteItem();
</script>

<div
  id={item.id}
  data-id={item.id}
  class="hover:bg-muted flex items-center gap-2 p-2 text-sm transition-colors"
>
  <div>
    <GripVertical class="text-muted-foreground h-4 w-4" />
  </div>
  <div class="flex-1">
    <h3 class={cn(!item.name && "text-muted-foreground italic")}>
      {item.name || "Unnamed Item"}
    </h3>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
  <DeleteButton handleDelete={() => $deleteItem.mutate(item.id)} />
</div>
