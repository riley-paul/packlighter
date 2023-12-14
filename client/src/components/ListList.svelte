<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Delete, Plus, X } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { link, location } from "svelte-spa-router";
  import {
    useCreateList,
    useLists,
    useRemoveList,
    useUpdateListsOrder,
  } from "@/hooks/useList";
  import DeleteButton from "./DeleteButton.svelte";
  import { dndzone } from "svelte-dnd-action";
  import type { ListsResponse } from "@/lib/types";
  import { flip } from "svelte/animate";

  const flipDurationMs = 200;

  $: lists = useLists();
  $: createList = useCreateList();
  $: removeList = useRemoveList();

  $: listData = $lists.data ?? [];

  $: updateListOrder = useUpdateListsOrder();
  const handleConsider = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
    listData = ev.detail.items;
  };

  const handleFinalize = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
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
    dropTargetClasses: ["outline", "outline-1", "outline-primary"],
  }}
  on:consider={handleConsider}
  on:finalize={handleFinalize}
  class="bg-card max-h-[200px] overflow-y-auto rounded-md border py-2 pr-2"
>
  {#each listData as list (list.id)}
    <div
      animate:flip={{ duration: flipDurationMs }}
      class={cn(
        "text-muted-foreground flex h-9 w-full items-center justify-between pl-4 hover:border-l-4 hover:pl-3",
        !list.name && "italic",
        $location.includes(list.id) &&
          "border-primary text-foreground border-l-4 pl-3",
      )}
    >
      <a use:link href={`/${list.id}`} class="flex-1">
        {list.name || "Unnamed List"}
      </a>
      <DeleteButton handleDelete={() => $removeList.mutate(list.id)} />
    </div>
  {/each}
</div>
