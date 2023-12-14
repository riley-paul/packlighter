<script lang="ts">
  import {
    useDeleteCategory,
    useToggleCategoryPacked,
    useUpdateCategory,
  } from "@/hooks/useCategory";
  import { Checkbox } from "./ui/checkbox";
  import { Button } from "./ui/button";
  import { GripVertical, Plus, X } from "lucide-svelte";
  import type {
    ExpandedCategory,
    ExpandedCategoryItem,
    ListWithCategories,
  } from "@/hooks/useList";
  import CategoryItem from "./CategoryItem.svelte";
  import { createItemTemplateCols, isCategoryFullyPacked } from "@/lib/helpers";
  import {
    useCreateCategoryItem,
    useUpdateCategoryItemsOrder,
  } from "@/hooks/useCategoryItem";

  export let category: ExpandedCategory;
  export let list: ListWithCategories;

  import { dndzone } from "svelte-dnd-action";

  import { Input } from "./ui/input";
  import DeleteButton from "./base/DeleteButton.svelte";
  import { flip } from "svelte/animate";
  import { flipDurationMs } from "@/lib/constants";
  import DragHandle from "./base/DragHandle.svelte";

  $: updateCategory = useUpdateCategory();
  $: deleteCategory = useDeleteCategory();
  $: toggleCategoryPacked = useToggleCategoryPacked();
  $: createCategoryItem = useCreateCategoryItem();
  $: updateCategoryItemsOrder = useUpdateCategoryItemsOrder();

  $: saveCategory = () => $updateCategory.mutate({ id: category.id, category });

  const handleConsider = (ev: CustomEvent<DndEvent<ExpandedCategoryItem>>) => {
    category.items = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ExpandedCategoryItem>>) => {
    category.items = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateCategoryItemsOrder.mutate({
      categoryItemIds: ids,
      categoryId: category.id,
    });
  };
</script>

<article class="bg-card/80 rounded category">
  <div
    class="grid items-center gap-2 border-b-2 px-2 py-1 text-sm font-semibold"
    style="grid-template-columns: {createItemTemplateCols(list, false)}"
  >
    {#if list.show_packed}
      <Checkbox
        checked={isCategoryFullyPacked(category)}
        onCheckedChange={() => $toggleCategoryPacked.mutate(category)}
      />
    {/if}
    <form on:submit|preventDefault={saveCategory} class="flex-1">
      <Input
        bind:value={category.name}
        on:blur={saveCategory}
        placeholder="Category Name"
        class="text-primary h-auto w-full border-none bg-inherit py-0.5 text-base font-semibold shadow-none placeholder:italic"
      />
      <input type="hidden" />
    </form>
    {#if list.show_weights}
      <div class="text-foreground/70 text-center">Weight</div>
    {/if}

    <div class="text-foreground/70 text-center">Qty</div>
    <DeleteButton handleDelete={() => $deleteCategory.mutate(category)} />
    <DragHandle />
  </div>
  <div
    class="min-h-[0.5rem]"
    use:dndzone={{
      items: category.items,
      flipDurationMs,
      dropTargetStyle: {},
      dropTargetClasses: ["outline", "outline-1", "outline-primary"],
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each category.items as categoryItem (categoryItem.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <CategoryItem {list} {categoryItem} />
      </div>
    {/each}
  </div>
  <div>
    <Button
      variant="linkMuted"
      size="sm"
      on:click={() => $createCategoryItem.mutate({ category })}
      disabled={$createCategoryItem.isPending}
    >
      <Plus class="mr-2 h-4 w-4" />
      Add Item
    </Button>
  </div>
</article>
