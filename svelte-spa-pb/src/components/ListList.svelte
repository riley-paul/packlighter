<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Delete, Plus } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { link, location } from "svelte-spa-router";
  import { useCreateList, useLists, useRemoveList } from "@/hooks/useList";
  import { useQueryClient } from "@tanstack/svelte-query";

  const queryClient = useQueryClient();

  $: lists = useLists();
  $: createList = useCreateList(queryClient);
  $: removeList = useRemoveList(queryClient);
</script>

<div class="flex items-center justify-between">
  <h2 class="text-sm font-medium">Lists</h2>
  <Button size="sm" variant="ghost" on:click={() => $createList.mutate()}>
    <Plus class="mr-2 w-4" /> New List
  </Button>
</div>
<div class="overflow-auto">
  {#each $lists.data ?? [] as list}
    <div
      class={cn(
        "w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between",
        !list.name && "italic",
        $location.includes(list.id) &&
          "border-l-4 border-primary pl-3 text-foreground"
      )}
    >
      <a use:link href={`/${list.id}`} class="flex-1">
        {list.name || "Unnamed List"}
      </a>
      <Button
        size="icon"
        variant="ghost"
        class="h-8 w-8 opacity-0 group-hover:opacity-100"
        on:click={() => $removeList.mutate(list.id)}
      >
        <Delete class="h-4 w-4" />
      </Button>
    </div>
  {/each}
</div>
