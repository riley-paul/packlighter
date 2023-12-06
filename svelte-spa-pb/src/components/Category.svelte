<script lang="ts">
  import { useDeleteCategory, useUpdateCategory } from "@/hooks/useCategory";
  import { useQueryClient } from "@tanstack/svelte-query";
  import type { RecordModel } from "pocketbase";
  import { Checkbox } from "./ui/checkbox";
  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
  import { GripVertical, Plus, X } from "lucide-svelte";
  import type { ExpandedCategory } from "@/hooks/useList";
  import CategoryItem from "./CategoryItem.svelte";

  export let category: ExpandedCategory;
  export let list: RecordModel;

  const queryClient = useQueryClient();
  const updateCategory = useUpdateCategory(queryClient);
  const deleteCategory = useDeleteCategory(queryClient);

  $: saveCategory = () => $updateCategory.mutate(category);
</script>

<article>
  <div
    class="border-b-2 p-1 flex gap-1 items-center text-sm font-semibold group"
  >
    <!-- {#if list.show_packed}
      <Checkbox
        bind:checked={categoryPacked}
        onCheckedChange={(checked) =>
          packCategoryItems.mutate({ category, packed: Boolean(checked) })}
      />
    {/if} -->
    <form on:submit|preventDefault={saveCategory} class="flex-1">
      <Input
        bind:value={category.name}
        on:blur={saveCategory}
        placeholder="Category Name"
        class="font-semibold text-primary border-none shadow-none text-base"
      />
      <input type="hidden" />
    </form>
    {#if list.show_weights}
      <div class="text-foreground/70">Weight</div>
    {/if}

    <div class="text-foreground/70">Qty</div>
    <Button
      size="icon"
      variant="ghost"
      class="w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
      on:click={() => $deleteCategory.mutate(category)}
    >
      <X class="h-4 w-4" />
    </Button>
    <div>
      <GripVertical class="h-4 w-4" />
    </div>
  </div>
  {#each category.items as categoryItem}
    <CategoryItem {list} {categoryItem} />
  {/each}

  <div class="mt-2">
    <Button variant="linkMuted" size="sm">
      <!-- on:click={() => createCategoryItem.mutate(category.id)}
      disabled={createCategoryItem.isPending} -->
      <Plus class="h-4 w-4 mr-2" />
      Add Item
    </Button>
  </div>
</article>
