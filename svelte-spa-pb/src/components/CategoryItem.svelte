<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
  import type { ExpandedCategoryItem } from "@/hooks/useList";
  import { useQueryClient } from "@tanstack/svelte-query";
  import {
    useDeleteCategoryItem,
    useUpdateCategoryItem,
  } from "@/hooks/useCategoryItem";
  import { Checkbox } from "./ui/checkbox";
  import { GripVertical, X } from "lucide-svelte";

  export let list: RecordModel;
  export let categoryItem: ExpandedCategoryItem;

  const queryClient = useQueryClient();

  $: updateCategoryItem = useUpdateCategoryItem(queryClient, list.id);
  $: deleteCategoryItem = useDeleteCategoryItem(queryClient, list.id);

  $: saveCategoryItem = () => $updateCategoryItem.mutate(categoryItem);
</script>

<form
  class="border-b text-sm p-1 flex gap-1 items-center hover:bg-muted/30 transition-colors group"
  on:submit|preventDefault={saveCategoryItem}
>
  {#if list.show_packed}
    <Checkbox
      bind:checked={categoryItem.packed}
      onCheckedChange={saveCategoryItem}
    />
  {/if}

  <!-- {list.show_images && <ItemImage item={item.itemData} />} -->

  <Input
    bind:value={categoryItem.itemData.name}
    placeholder="Name"
    class="border-none shadow-none"
  />

  <Input
    bind:value={categoryItem.itemData.description}
    placeholder="Description"
    class="text-muted-foreground border-none shadow-none"
  />

  {#if list.show_weights}
    <Input
      bind:value={categoryItem.itemData.weight_g}
      type="number"
      min="0"
      class="border-none shadow-none"
    />
  {/if}

  <Input
    bind:value={categoryItem.quantity}
    type="number"
    min="1"
    class="border-none shadow-none"
  />

  <input type="hidden" />
  <Button
    size="icon"
    variant="ghost"
    type="button"
    class="w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
    on:click={() => $deleteCategoryItem.mutate(categoryItem)}
  >
    <X class="h-4 w-4" />
  </Button>
  <div>
    <GripVertical class="h-4 w-4" />
  </div>
</form>
