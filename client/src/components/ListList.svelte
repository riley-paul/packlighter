<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Delete, Plus, X } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { link, location } from "svelte-spa-router";
  import { useCreateList, useLists, useRemoveList } from "@/hooks/useList";

  $: lists = useLists();
  $: createList = useCreateList();
  $: removeList = useRemoveList();

  $: isOverflowing = ($lists.data?.length ?? 0 * 32) > 200;
</script>

<div class="flex items-center justify-between">
  <h2 class="text-sm font-medium">Lists</h2>
  <Button size="sm" variant="ghost" on:click={() => $createList.mutate()}>
    <Plus class="mr-2 w-4" /> New List
  </Button>
</div>
<div
  id="list-container"
  class="max-h-[200px] overflow-y-scroll pr-4"
  class:border-b-2={isOverflowing}
>
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
      <Button
        size="icon"
        variant="ghost"
        class="h-6 w-6 rounded-full"
        on:click={() => $removeList.mutate(list.id)}
      >
        <X class="h-4 w-4" />
      </Button>
    </div>
  {/each}
</div>

<style>
  #list-container {
    scrollbar-gutter: stable;
  }
</style>
