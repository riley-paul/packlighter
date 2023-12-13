<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import { Button } from "./ui/button";
  import type { ExpandedCategoryItem } from "@/hooks/useList";
  import { useQueryClient } from "@tanstack/svelte-query";
  import {
    useDeleteCategoryItem,
    useUpdateCategoryItem,
  } from "@/hooks/useCategoryItem";
  import { Checkbox } from "./ui/checkbox";
  import { GripVertical, X } from "lucide-svelte";
  import ItemImage from "./ItemImage.svelte";
  import {
    createItemTemplateCols,
    getWeightInGrams,
    getWeightInUnit,
    massUnits,
  } from "@/lib/helpers";

  export let list: RecordModel;
  export let categoryItem: ExpandedCategoryItem;

  $: updateCategoryItem = useUpdateCategoryItem();
  $: deleteCategoryItem = useDeleteCategoryItem();

  let displayedWeight = getWeightInUnit(
    categoryItem.itemData.weight_g,
    categoryItem.itemData.weight_unit,
  );

  $: saveCategoryItem = () => {
    categoryItem.itemData.weight_g = getWeightInGrams(
      displayedWeight,
      categoryItem.itemData.weight_unit,
    );
    $updateCategoryItem.mutate(categoryItem);
  };
</script>

<form
  id={categoryItem.id}
  class="@container hover:bg-muted grid items-center gap-2 border-b px-2 py-1 text-sm transition-colors"
  style="grid-template-columns: {createItemTemplateCols(list, true)}"
  on:submit|preventDefault={saveCategoryItem}
>
  {#if list.show_packed}
    <Checkbox
      bind:checked={categoryItem.packed}
      onCheckedChange={saveCategoryItem}
    />
  {/if}

  {#if list.show_images}
    <ItemImage item={categoryItem.itemData} />
  {/if}

  <div class="@lg:grid-cols-[1fr_2fr] grid grid-cols-1">
    <input
      bind:value={categoryItem.itemData.name}
      on:blur={saveCategoryItem}
      name="name"
      placeholder="Name"
      class="w-full min-w-0 bg-inherit px-1 py-0.5"
    />

    <textarea
      bind:value={categoryItem.itemData.description}
      on:blur={saveCategoryItem}
      rows={list.show_images ? 2 : 1}
      name="description"
      placeholder="Description"
      class="text-muted-foreground w-full min-w-0 resize-none overflow-hidden bg-inherit px-1 py-0.5"
    />
  </div>

  {#if list.show_weights}
    <div class="flex">
      <input
        bind:value={displayedWeight}
        on:change={saveCategoryItem}
        name="weight_g"
        type="number"
        min="0"
        class="min-w-0 bg-inherit text-right"
      />
      <select
        bind:value={categoryItem.itemData.weight_unit}
        on:change={saveCategoryItem}
        class="bg-inherit"
      >
        {#each massUnits as massUnit}
          <option value={massUnit}>
            {massUnit}
          </option>
        {/each}
      </select>
    </div>
  {/if}

  <input
    bind:value={categoryItem.quantity}
    on:change={saveCategoryItem}
    name="quantity"
    type="number"
    min="1"
    class="bg-inherit text-center"
  />

  <input type="hidden" />
  <Button
    size="icon"
    variant="ghost"
    type="button"
    class="h-6 w-6 rounded-full"
    on:click={() => $deleteCategoryItem.mutate(categoryItem)}
  >
    <X class="h-4 w-4" />
  </Button>
  <div class="handle">
    <GripVertical class="text-muted-foreground h-4 w-4" />
  </div>
</form>
