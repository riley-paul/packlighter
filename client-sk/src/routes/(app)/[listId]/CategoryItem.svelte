<script lang="ts">
  import type {
    ExpandedCategoryItem,
    ListWithCategories,
  } from "@/hooks/useList";
  import {
    useDeleteCategoryItem,
    useUpdateCategoryItem,
  } from "@/hooks/useCategoryItem";
  import { Checkbox } from "../../../components/ui/checkbox";
  import ItemImage from "./ItemImage.svelte";
  import {
    createCategoryTemplateCols,
    selectContentOnFocus,
  } from "@/lib/helpers";
  import { Input } from "../../../components/ui/input";
  import DeleteButton from "../../../components/base/DeleteButton.svelte";
  import DragHandle from "../../../components/base/DragHandle.svelte";
  import { DRAGGABLE_CLASS } from "@/lib/constants";
  import { ItemsWeightUnitOptions } from "@/lib/types";
  import { ChevronDown, ChevronUp } from "lucide-svelte";
  import { Button } from "../../../components/ui/button";
  import SpinBox from "../../../components/base/SpinBox.svelte";

  export let list: ListWithCategories;
  export let categoryItem: ExpandedCategoryItem;

  $: updateCategoryItem = useUpdateCategoryItem();
  $: deleteCategoryItem = useDeleteCategoryItem();

  $: saveCategoryItem = () => {
    $updateCategoryItem.mutate({ id: categoryItem.id, categoryItem });
  };
</script>

<form
  id={categoryItem.id}
  data-id={categoryItem.id}
  class="{DRAGGABLE_CLASS} hover:bg-muted grid items-center gap-2 border-b px-2 py-1 text-sm transition-colors"
  style="grid-template-columns: {createCategoryTemplateCols({
    list,
    type: 'body',
  })}"
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
        on:blur={saveCategoryItem}
        bind:value={categoryItem.itemData.weight}
        on:focus={selectContentOnFocus}
        name="weight"
        type="number"
        autocomplete="off"
        min="0"
        class="h-auto min-w-0 border-none px-1 py-0.5 text-right shadow-none"
      />
      <select
        bind:value={categoryItem.itemData.weight_unit}
        on:change={saveCategoryItem}
        class="bg-inherit"
      >
        {#each Object.values(ItemsWeightUnitOptions) as massUnit}
          <option value={massUnit}>
            {massUnit}
          </option>
        {/each}
      </select>
    </div>
  {/if}

  <div class="flex gap-0.5">
    <Input
      bind:value={categoryItem.quantity}
      on:change={saveCategoryItem}
      on:focus={selectContentOnFocus}
      name="quantity"
      type="number"
      autocomplete="off"
      min="1"
      class="h-auto min-w-0 border-none px-1 py-0.5 text-right shadow-none"
    />
    <SpinBox
      bind:value={categoryItem.quantity}
      handleChange={saveCategoryItem}
      min={1}
    />
  </div>

  <input type="hidden" />
  <DeleteButton
    handleDelete={() => $deleteCategoryItem.mutate(categoryItem)}
    noConfirm
  />
  <DragHandle />
</form>
