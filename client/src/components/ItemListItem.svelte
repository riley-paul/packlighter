<script lang="ts">
  import { GripVertical, X } from "lucide-svelte";
  import { Button } from "./ui/button";
  import { useDeleteItem } from "@/hooks/useItem";
  import { cn } from "@/lib/utils";
  import type { ItemsResponse } from "@/lib/types";

  export let item: ItemsResponse;

  const deleteItem = useDeleteItem();
</script>

<div
  class="hover:bg-card flex items-center gap-2 p-2 pl-0 text-sm transition-colors"
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
  <Button
    size="icon"
    variant="ghost"
    class="h-6 w-6 rounded-full"
    on:click={() => $deleteItem.mutate(item.id)}
  >
    <X class="h-4 w-4" />
  </Button>
</div>
