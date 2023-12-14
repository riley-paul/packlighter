<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Button } from "@/components/ui/button";
  import { Loader2, Plus } from "lucide-svelte";
  import { useList, type ExpandedCategory } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import Category from "@/components/Category.svelte";
  import {
    useCreateCategory,
    useUpdateCategoriesOrder,
  } from "@/hooks/useCategory";
  import { Input } from "@/components/ui/input";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
    import { flipDurationMs } from "@/lib/constants";

  export let params = { listId: "" };

  $: list = useList(params.listId);
  $: createCategory = useCreateCategory();
  $: updateCategoriesOrder = useUpdateCategoriesOrder();

  $: categories = $list.data?.categories ?? [];

  const handleConsider = (ev: CustomEvent<DndEvent<ExpandedCategory>>) => {
    categories = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ExpandedCategory>>) => {
    categories = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateCategoriesOrder.mutate({ categoryIds: ids });
  };
</script>

<LayoutApp>
  <Card class="@container h-fit flex-1 p-6">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <div class="flex w-full items-center justify-center py-24">
        <Loader2 class="text-primary h-8 w-8 animate-spin" />
      </div>
    {:else if $list.data}
      <div class="flex flex-col gap-4">
        <ListHeader list={$list.data} />
        <div
          use:dndzone={{
            items: categories,
            flipDurationMs,
            type: "categories",
          }}
          on:consider={handleConsider}
          on:finalize={handleFinalize}
        >
          {#each categories as category (category.id)}
            <div animate:flip={{ duration: flipDurationMs }}>
              <Category {category} list={$list.data} />
            </div>
          {/each}
        </div>
        <div>
          <Button
            variant="linkMuted"
            size="sm"
            on:click={() => $createCategory.mutate(params.listId)}
            disabled={$createCategory.isPending}
          >
            <Plus class="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</LayoutApp>
