<script lang="ts">
  import {
    useDeleteCategory,
    useToggleCategoryPacked,
    useUpdateCategory,
  } from "@/hooks/useCategory";
  import { Checkbox } from "./ui/checkbox";
  import { Button } from "./ui/button";
  import { Plus } from "lucide-svelte";
  import type {
    ExpandedCategory,
    ExpandedCategoryItem,
    ListWithCategories,
  } from "@/hooks/useList";
  import CategoryItem from "./CategoryItem.svelte";
  import {
    createCategoryTemplateCols,
    createTempCategoryItem,
    getItemWeightInUnit,
    isCategoryFullyPacked,
    transformDraggedElement,
  } from "@/lib/helpers";
  import {
    useCreateCategoryItem,
    useUpdateCategoryItemsOrder,
  } from "@/hooks/useCategoryItem";
  import {
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
    SHADOW_PLACEHOLDER_ITEM_ID,
    dndzone,
  } from "svelte-dnd-action";
  import { Input } from "./ui/input";
  import DeleteButton from "./base/DeleteButton.svelte";
  import {
    CATEGORY_NAME_CLASS,
    DRAGGABLE_CLASS,
    flipDurationMs,
  } from "@/lib/constants";
  import DragHandle from "./base/DragHandle.svelte";
  import DragGhost from "./base/DragGhost.svelte";
  import { isForeignItem } from "@/lib/store";
  import type { ItemsResponse } from "@/lib/types";

  export let category: ExpandedCategory;
  export let list: ListWithCategories;

  type CategorItemWithShadowItem = ExpandedCategoryItem & {
    [SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
  };

  $: categoryItems = (category.items ?? []) as CategorItemWithShadowItem[];

  $: updateCategory = useUpdateCategory();
  $: deleteCategory = useDeleteCategory();
  $: toggleCategoryPacked = useToggleCategoryPacked();
  $: createCategoryItem = useCreateCategoryItem();
  $: updateCategoryItemsOrder = useUpdateCategoryItemsOrder();

  $: saveCategory = () => $updateCategory.mutate({ id: category.id, category });

  const handleConsider = async (
    ev: CustomEvent<DndEvent<ExpandedCategoryItem>>,
  ) => {
    if ($isForeignItem) {
      categoryItems = ev.detail.items.map((item) =>
        item.id === SHADOW_PLACEHOLDER_ITEM_ID
          ? {
              ...item,
              ...createTempCategoryItem(item as unknown as ItemsResponse),
            }
          : item,
      );
      return;
    }
    categoryItems = ev.detail.items;
  };

  const handleFinalize = async (
    ev: CustomEvent<DndEvent<ExpandedCategoryItem>>,
  ) => {
    const { id } = ev.detail.info;

    if ($isForeignItem) {
      const insertionIndex = categoryItems.findIndex(
        (item) => item.id === SHADOW_PLACEHOLDER_ITEM_ID,
      );
      $createCategoryItem.mutate({
        category,
        itemId: id,
        insertionIndex,
      });
      return;
    }

    categoryItems = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateCategoryItemsOrder.mutate({
      categoryItemIds: ids,
      categoryId: category.id,
    });
  };
</script>

<article class={DRAGGABLE_CLASS} id={category.id}>
  <header
    class="grid items-center gap-2 border-b-2 px-2 py-1 text-sm font-semibold"
    style="grid-template-columns: {createCategoryTemplateCols({
      list,
      type: 'header',
    })}"
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
        class="{CATEGORY_NAME_CLASS} text-primary h-auto w-full border-none bg-inherit py-0.5 text-base font-semibold shadow-none placeholder:italic"
      />
      <input type="hidden" />
    </form>
    {#if list.show_weights}
      <div class="text-foreground/70 text-center">Weight</div>
    {/if}

    <div class="text-foreground/70 text-center">Qty</div>
    <DeleteButton handleDelete={() => $deleteCategory.mutate(category)} />
    <DragHandle />
  </header>
  <div
    class="min-h-[0.5rem] rounded"
    use:dndzone={{
      items: categoryItems,
      type: "items",
      dropTargetStyle: {},
      flipDurationMs,
      transformDraggedElement,
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each categoryItems as categoryItem (categoryItem.id)}
      <div class="relative">
        <CategoryItem {list} {categoryItem} />
        {#if categoryItem[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <DragGhost />
        {/if}
      </div>
    {/each}
  </div>
  <footer
    class="grid items-center gap-2 border-t px-2 text-sm"
    style="grid-template-columns: {createCategoryTemplateCols({
      list,
      type: 'footer',
    })};"
  >
    <Button
      size="sm"
      class="w-min"
      variant="linkMuted"
      on:click={() => $createCategoryItem.mutate({ category })}
      disabled={$createCategoryItem.isPending}
    >
      <Plus class="mr-2 h-4 w-4" />
      Add Item
    </Button>
    {#if list.show_weights}
      <div class="flex gap-2 justify-self-end pr-6 font-semibold">
        <p>
          {Math.round(
            category.items.reduce(
              (acc, val) =>
                acc + getItemWeightInUnit(val.itemData, list.weight_unit),
              0,
            ),
          )}
        </p>
        <p>{list.weight_unit}</p>
      </div>
    {/if}
    <div class="pr-0.5 text-right font-semibold">
      {category.items.reduce((acc, val) => acc + val.quantity, 0)}
    </div>
  </footer>
</article>
