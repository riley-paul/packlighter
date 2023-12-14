<script lang="ts">
  import {
    useDeleteCategory,
    useToggleCategoryPacked,
    useUpdateCategory,
  } from "@/hooks/useCategory";
  import { Checkbox } from "./ui/checkbox";
  import { Button } from "./ui/button";
  import { GripVertical, Plus, X } from "lucide-svelte";
  import type { ExpandedCategory, ListWithCategories } from "@/hooks/useList";
  import CategoryItem from "./CategoryItem.svelte";
  import { createItemTemplateCols, isCategoryFullyPacked } from "@/lib/helpers";
  import { useCreateCategoryItem } from "@/hooks/useCategoryItem";

  export let category: ExpandedCategory;
  export let list: ListWithCategories;

  import Sortable from "sortablejs";
  import { onMount } from "svelte";
  import { Input } from "./ui/input";
  import DeleteButton from "./DeleteButton.svelte";

  $: updateCategory = useUpdateCategory();
  $: deleteCategory = useDeleteCategory();
  $: toggleCategoryPacked = useToggleCategoryPacked();
  $: createCategoryItem = useCreateCategoryItem();

  $: saveCategory = () => $updateCategory.mutate({ id: category.id, category });

  let categoryElement: HTMLElement;

  onMount(() => {
    Sortable.create(categoryElement, {
      group: { name: "category", put: true },
      animation: 100,
      handle: ".handle",
      ghostClass: "opacity-50",
      // onAdd: (ev) => {
      //   $moveCategoryItem.mutate({ id: ev.item.id, newCategory: ev.to.id });
      //   //remove category from old category
      //   list.categories.forEach((cat) => {
      //     cat.items = cat.items.filter((item) => item.id !== ev.item.id);
      //   });
      //   //add category to new category
      //   const categoryItem = list.categories.flatMap((cat) =>
      //     cat.items.filter((item) => item.id === ev.item.id),
      //   )[0];
      //   console.log(categoryItem);
      // },
    });
  });
</script>

<article>
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
        class="text-primary h-auto w-full border-none bg-inherit py-0.5 text-base font-semibold shadow-none"
      />
      <input type="hidden" />
    </form>
    {#if list.show_weights}
      <div class="text-foreground/70 text-center">Weight</div>
    {/if}

    <div class="text-foreground/70 text-center">Qty</div>
    <DeleteButton handleDelete={() => $deleteCategory.mutate(category)} />
    <div>
      <GripVertical class="text-muted-foreground h-4 w-4" />
    </div>
  </div>
  <div id={category.id} bind:this={categoryElement}>
    {#each category.items as categoryItem}
      <CategoryItem {list} {categoryItem} />
    {/each}
  </div>

  <div class="mt-2">
    <Button
      variant="linkMuted"
      size="sm"
      on:click={() => $createCategoryItem.mutate(category)}
      disabled={$createCategoryItem.isPending}
    >
      <Plus class="mr-2 h-4 w-4" />
      Add Item
    </Button>
  </div>
</article>
