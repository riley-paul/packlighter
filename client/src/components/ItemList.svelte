<script lang="ts">
  import { useItems, useUpdateItemsOrder } from "@/hooks/useItem";
  import { Input } from "./ui/input";
  import ItemListItem from "./ItemListItem.svelte";

  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { ItemsResponse } from "@/lib/types";
  import { flipDurationMs } from "@/lib/constants";

  let searchTerm = "";

  type ItemWithShadowItem = ItemsResponse & {
    [SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
  };

  const items = useItems();
  $: filteredItems = ($items.data?.filter(
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
      transformDraggedElement: (el) => {
        el?.querySelector(".item")?.classList.add(
          "bg-secondary/50",
          "rounded",
          "border",
        );
      },
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each filteredItems as item (item.id)}
      <div animate:flip={{ duration: flipDurationMs }} class="relative">
        <ItemListItem {item} />
        {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <div class="bg-secondary/50 visible absolute inset-0" />
        {/if}
      </div>
    {/each}
  </div>
{/if}
