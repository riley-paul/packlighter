<script lang="ts">
  import { useItems, useUpdateItemsOrder } from "@/hooks/useItem";
  import { Input } from "./ui/input";
  import ItemListItem from "./ItemListItem.svelte";

  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { ItemsResponse } from "@/lib/types";
  import { flipDurationMs, isDraggingClasslist } from "@/lib/constants";
  import { currentList } from "@/lib/store";
  import { useList } from "@/hooks/useList";
  import { getListItemIds } from "@/lib/helpers";
  import DragGhost from "./base/DragGhost.svelte";

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
    filteredItems = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
    filteredItems = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateItemsOrder.mutate({ itemIds: ids });
  };
</script>

<div>
  <div class="mb-2 flex items-center justify-between gap-4">
    <h2 class="text-sm font-medium">Gear</h2>
    <Input
      type="search"
      placeholder="Search..."
      class="bg-card shadow-none"
      bind:value={searchTerm}
    />
  </div>
</div>
{#if $items.isError}
  <p>Error: {$items.error}</p>
{:else if $items.isLoading}
  <p>Loading...</p>
{:else}
  <div
    class="bg-card flex-1 overflow-auto rounded-md border"
    use:dndzone={{
      items: filteredItems,
      type: "items",
      dropFromOthersDisabled: true,
      flipDurationMs,
      dropTargetStyle: {},
      dropTargetClasses: ["border-primary"],
      transformDraggedElement: (el, data) => {
        console.log("data", data);
        el?.querySelector(".item")?.classList.add(...isDraggingClasslist);
      },
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
{/if}
