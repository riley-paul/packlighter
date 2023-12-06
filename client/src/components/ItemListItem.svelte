<script lang="ts">
  import { GripVertical, X } from "lucide-svelte";
  import type { RecordModel } from "pocketbase";
  import { Button } from "./ui/button";
  import { useDeleteItem } from "@/hooks/useItem";
  import { useQueryClient } from "@tanstack/svelte-query";

  export let item: RecordModel;

  const queryClient = useQueryClient();

  const deleteItem = useDeleteItem(queryClient);
</script>

<div
  class="text-sm p-2 pl-0 hover:bg-card transition-colors flex items-center gap-2"
>
  <div>
    <GripVertical class="h-4 w-4 text-muted-foreground" />
  </div>
  <div class="flex-1">
    <h3 class="">{item.name}</h3>
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
