<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Delete, Plus, X } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { link, location } from "svelte-spa-router";
  import { useCreateList, useLists, useRemoveList } from "@/hooks/useList";
  import DeleteButton from "./DeleteButton.svelte";

  $: lists = useLists();
  $: createList = useCreateList();
  $: removeList = useRemoveList();
</script>

<div class="mb-2 flex items-center justify-between">
  <h2 class="text-sm font-medium">Lists</h2>
  <Button size="sm" variant="linkMuted" on:click={() => $createList.mutate()}>
    <Plus class="mr-2 w-4" /> New List
  </Button>
</div>
<div id="list-container" class="max-h-[200px] overflow-y-scroll border-y pr-4">
  {#each $lists.data ?? [] as list}
    <div
      class={cn(
        "text-muted-foreground flex h-8 w-full items-center justify-between pl-4 hover:border-l-4 hover:pl-3",
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

<style>
  #list-container {
    scrollbar-gutter: stable;
  }
</style>
