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
  import ItemImage from "./ItemImage.svelte";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
  import {
    createItemTemplateCols,
    getItemWeightInUnit,
    massUnits,
  } from "@/lib/helpers";

  export let list: RecordModel;
  export let categoryItem: ExpandedCategoryItem;

  console.log(categoryItem);

  const queryClient = useQueryClient();

  $: updateCategoryItem = useUpdateCategoryItem(queryClient);
  $: deleteCategoryItem = useDeleteCategoryItem(queryClient);

  $: saveCategoryItem = () => {
    console.log(categoryItem);
    $updateCategoryItem.mutate(categoryItem);
  };

  $: selectedWeightUnit = { value: categoryItem.itemData.weight_unit };
</script>

<form
  class="@container grid items-center gap-1 border-b p-2 text-sm transition-colors hover:bg-muted/30"
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

  <div>
    <input
      bind:value={categoryItem.itemData.name}
      on:blur={saveCategoryItem}
      name="name"
      placeholder="Name"
      class="w-full min-w-0 bg-inherit p-1"
    />

    <input
      bind:value={categoryItem.itemData.description}
      on:blur={saveCategoryItem}
      name="description"
      placeholder="Description"
      class="w-full min-w-0 bg-inherit p-1 text-muted-foreground"
    />
  </div>

  {#if list.show_weights}
    <div class="flex">
      <input
        value={getItemWeightInUnit(categoryItem)}
        on:blur={saveCategoryItem}
        on:change={saveCategoryItem}
        name="weight_g"
        type="number"
        min="0"
        class="min-w-0 bg-inherit text-right"
      />
      <select
        on:change={(ev) => {
          console.log(ev);
          categoryItem.itemData.weight_unit = ev.target?.value ?? "g";
          saveCategoryItem();
        }}
        class="bg-inherit"
      >
        {#each massUnits as massUnit}
          <option
            value={massUnit}
            selected={categoryItem.itemData.weight_unit === massUnit}
          >
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
    <GripVertical class="h-4 w-4 text-muted-foreground" />
  </div>
</form>
