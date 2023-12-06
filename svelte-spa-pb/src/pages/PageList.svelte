<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import { pb } from "@/lib/pocketbase";
  import ListHeader from "@/components/ListHeader.svelte";
  import Category from "@/components/Category.svelte";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { useCreateCategory } from "@/hooks/useCategory";
  import { onDestroy, onMount } from "svelte";
  import { currentList } from "@/lib/store";

  const queryClient = useQueryClient();

  export let params = { listId: "" };

  onMount(() => currentList.set(params.listId));
  onDestroy(() => currentList.set(null));

  $: list = useList(params.listId);
  $: createCategory = useCreateCategory(queryClient);
</script>

<LayoutApp>
  <Card class="flex-1 p-6 h-fit @container">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <p>Loading...</p>
    {:else if $list.data}
      <div class="flex flex-col gap-4">
        <ListHeader list={$list.data} />
        {#each $list.data.categories as category (category.id)}
          <Category {category} list={$list.data} />
        {/each}
        <div>
          <Button
            variant="linkMuted"
            size="sm"
            on:click={() => $createCategory.mutate(params.listId)}
            disabled={$createCategory.isPending}
          >
            <Plus class="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</LayoutApp>
