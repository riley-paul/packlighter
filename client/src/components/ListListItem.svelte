<script lang="ts">
  import { useRemoveList } from "@/hooks/useList";
  import DeleteButton from "./base/DeleteButton.svelte";
  import DragHandle from "./base/DragHandle.svelte";
  import type { ListsResponse } from "@/lib/types";
  import { cn } from "@/lib/utils";
  import { link, location } from "svelte-spa-router";

  export let list: ListsResponse;

  $: removeList = useRemoveList();
</script>

<div
  class={cn(
    "text-muted-foreground list flex w-full items-center justify-between gap-2 pl-4 pr-2 hover:border-l-4 hover:pl-3",
    !list.name && "italic",
    $location.includes(list.id) &&
      "border-primary text-foreground border-l-4 pl-3",
  )}
>
  <a use:link href={`/${list.id}`} class="flex h-9 flex-1 items-center">
    {list.name || "Unnamed List"}
  </a>
  <DeleteButton handleDelete={() => $removeList.mutate(list.id)} />
  <DragHandle />
</div>
