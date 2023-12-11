<script lang="ts">
  import { GripVertical, X } from "lucide-svelte";
  import type { RecordModel } from "pocketbase";
  import { Button } from "./ui/button";
  import { useDeleteItem } from "@/hooks/useItem";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { cn } from "@/lib/utils";

  export let item: RecordModel;

  const queryClient = useQueryClient();

  const deleteItem = useDeleteItem(queryClient);
</script>

<div
  class="flex items-center gap-2 p-2 pl-0 text-sm transition-colors hover:bg-card"
>
  <div>
    <GripVertical class="h-4 w-4 text-muted-foreground" />
  </div>
  <div class="flex-1">
    <h3 class={cn(!item.name && "italic text-muted-foreground")}>
      {item.name || "Unnamed Item"}
    </h3>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
  <Button
    size="icon"
    variant="ghost"
    class="h-6 w-6 rounded-full"
    on:click={() => $deleteItem.mutate(item)}
  >
    <X class="h-4 w-4" />
  </Button>
</div>
