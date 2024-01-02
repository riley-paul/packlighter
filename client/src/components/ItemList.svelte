<script lang="ts">
  import { useItems, useUpdateItemsOrder } from "@/hooks/useItem";
  import { Input } from "./ui/input";
  import ItemListItem from "./ItemListItem.svelte";

  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { ItemsResponse } from "@/lib/types";
  import { flipDurationMs, isDraggingClasslist } from "@/lib/constants";
  import { currentList, isForeignItem } from "@/lib/store";
  import { useList } from "@/hooks/useList";
  import { getListItemIds, transformDraggedElement } from "@/lib/helpers";
  import DragGhost from "./base/DragGhost.svelte";
  import LayoutIconTitleSubtitle from "@/layouts/LayoutIconTitleSubtitle.svelte";
  import { SearchX, Table } from "lucide-svelte";
  import { Button, buttonVariants } from "./ui/button";
  import { link } from "svelte-spa-router";

  let searchTerm = "";

  type ItemWithShadowItem = ItemsResponse & {
    [SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
  };

  $: list = useList($currentList ?? "");
  $: allListItems = $list.data ? getListItemIds($list.data) : [];

  const items = useItems();
  $: filteredItems = ($items.data
    ?.filter((i) => !allListItems.includes(i.id))
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? []) as ItemWithShadowItem[];

  $: updateItemsOrder = useUpdateItemsOrder();
  const handleConsider = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
    $isForeignItem = true;
    filteredItems = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
    filteredItems = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateItemsOrder.mutate({ itemIds: ids });
    $isForeignItem = false;
  };
</script>

<div class="mb-2">
  <div class="flex items-center justify-between gap-4">
    <h2 class="text-sm font-medium">Gear</h2>
    <a
      class={buttonVariants({ size: "sm", variant: "linkMuted" })}
      href="/gear"
      use:link
    >
      <Table class="mr-2 w-4" /> All gear
    </a>
  </div>
  <Input
    type="search"
    placeholder="Filter..."
    class="bg-card shadow-none"
    bind:value={searchTerm}
  />
</div>
{#if $items.isError}
  <p>Error: {$items.error}</p>
{:else if $items.isLoading}
  <p>Loading...</p>
{:else if filteredItems.length > 0}
  <div
    class="bg-card flex-1 overflow-auto rounded-md border transition-colors"
    use:dndzone={{
      items: filteredItems,
      type: "items",
      dropFromOthersDisabled: true,
      flipDurationMs,
      dropTargetStyle: {},
      dropTargetClasses: ["border-primary"],
      transformDraggedElement,
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each filteredItems as item (item.id)}
      <div animate:flip={{ duration: flipDurationMs }} class="relative">
        <ItemListItem {item} />
        {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <DragGhost fullWidth />
        {/if}
      </div>
    {/each}
  </div>
{:else}
  <div class="bg-card flex-1 overflow-auto rounded-md border transition-colors">
    <LayoutIconTitleSubtitle>
      <SearchX class="h-10 w-10" />
      <span slot="title">No items found</span>
      <span slot="subtitle">Try searching for something else</span>
    </LayoutIconTitleSubtitle>
  </div>
{/if}
