<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Plus } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { link, location } from "svelte-spa-router";
  import {
    useCreateList,
    useLists,
    useRemoveList,
    useUpdateListsOrder,
  } from "@/hooks/useList";
  import DeleteButton from "./base/DeleteButton.svelte";
  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";
  import type { ListsResponse } from "@/lib/types";
  import { flip } from "svelte/animate";
  import { flipDurationMs } from "@/lib/constants";
  import DragHandle from "./base/DragHandle.svelte";
  import { fade } from "svelte/transition";
  import { cubicIn } from "svelte/easing";

  type ListWithShadowItem = ListsResponse & {
    [SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
  };

  $: lists = useLists();
  $: createList = useCreateList();
  $: removeList = useRemoveList();

  $: listData = ($lists.data ?? []) as ListWithShadowItem[];

  $: updateListOrder = useUpdateListsOrder();
  const handleConsider = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
    listData = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
    listData = ev.detail.items;
    const ids = ev.detail.items.map((item) => item.id);
    $updateListOrder.mutate({ listIds: ids });
  };
</script>

<div class="mb-2 flex items-center justify-between">
  <h2 class="text-sm font-medium">Lists</h2>
  <Button size="sm" variant="linkMuted" on:click={() => $createList.mutate()}>
    <Plus class="mr-2 w-4" /> New List
  </Button>
</div>
<div
  use:dndzone={{
    items: listData,
    type: "lists",
    flipDurationMs,
    dropTargetStyle: {},
    dropTargetClasses: ["border-primary"],
  }}
  on:consider={handleConsider}
  on:finalize={handleFinalize}
  class="bg-card max-h-[200px] overflow-y-auto rounded-md border py-2 transition-colors"
>
  {#each listData as list (list.id)}
    <div
      animate:flip={{ duration: flipDurationMs }}
      class={cn(
        "text-muted-foreground relative flex h-9 w-full items-center justify-between gap-2 pl-4 pr-2 hover:border-l-4 hover:pl-3",
        !list.name && "italic",
        $location.includes(list.id) &&
          "border-primary text-foreground border-l-4 pl-3",
      )}
    >
      <a use:link href={`/${list.id}`} class="flex-1">
        {list.name || "Unnamed List"}
      </a>
      <DeleteButton handleDelete={() => $removeList.mutate(list.id)} />
      <DragHandle />
      {#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
        <div
          in:fade={{ duration: 200, easing: cubicIn }}
          class="bg-secondary/50 visible absolute inset-0"
        />
      {/if}
    </div>
  {/each}
</div>
