<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import { Button } from "./ui/button";
  import type {
    ExpandedCategoryItem,
    ListWithCategories,
  } from "@/hooks/useList";
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
    type MassUnit,
  } from "@/lib/helpers";
  import { Textarea } from "./ui/textarea";
  import { Input } from "./ui/input";
  import DeleteButton from "./base/DeleteButton.svelte";
  import DragHandle from "./base/DragHandle.svelte";

  const test = "test";

  export let list: ListWithCategories;
  export let categoryItem: ExpandedCategoryItem;

  $: updateCategoryItem = useUpdateCategoryItem();
  $: deleteCategoryItem = useDeleteCategoryItem();

  let displayedWeight = getWeightInUnit(
    categoryItem.itemData.weight_g,
    categoryItem.itemData.weight_unit as MassUnit,
  );

  $: saveCategoryItem = () => {
    categoryItem.itemData.weight_g = getWeightInGrams(
      displayedWeight,
      categoryItem.itemData.weight_unit as MassUnit,
    );
    $updateCategoryItem.mutate({ id: categoryItem.id, categoryItem });
  };
</script>

<form
  id={categoryItem.id}
  data-id={categoryItem.id}
  class="hover:bg-muted grid items-center gap-2 border-b px-2 py-1 text-sm transition-colors"
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

  <div class="@container">
    <div class="@md:grid-cols-[1fr_2fr] grid grid-cols-1 gap-x-2">
      <Input
        bind:value={categoryItem.itemData.name}
        on:blur={saveCategoryItem}
        name="name"
        placeholder="Name"
        class="h-auto w-full min-w-0 border-none bg-inherit py-0.5 shadow-none placeholder:italic"
      />

      <Input
        bind:value={categoryItem.itemData.description}
        on:blur={saveCategoryItem}
        name="description"
        placeholder="Description"
        class="text-muted-foreground h-auto w-full min-w-0 resize-none overflow-hidden border-none bg-inherit py-0.5 shadow-none placeholder:italic"
      />
    </div>
  </div>

  {#if list.show_weights}
    <div class="flex">
      <Input
        bind:value={displayedWeight}
        on:change={saveCategoryItem}
        name="weight_g"
        type="number"
        min="0"
        class="h-auto min-w-0 border-none px-1 py-0.5 shadow-none"
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

  <Input
    bind:value={categoryItem.quantity}
    on:change={saveCategoryItem}
    name="quantity"
    type="number"
    min="1"
    class="h-auto min-w-0 border-none px-1 py-0.5 shadow-none"
  />

  <input type="hidden" />
  <DeleteButton
    handleDelete={() => $deleteCategoryItem.mutate(categoryItem)}
    noConfirm
  />
  <DragHandle />
</form>
