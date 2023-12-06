<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import { pb } from "@/lib/pocketbase";

  export let params = { listId: "" };

  $: list = useList(params.listId);
</script>

<LayoutApp>
  <Card class="flex-1 p-6 h-fit @container">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <p>Loading...</p>
    {:else}
      <div class="flex flex-col gap-4">
        {$list.data?.name}
        <!-- <ListHeader list={$queryList.data} /> -->
        <!-- <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {queryList.data.categories.map((c) => (
          <Category
          key={c.id}
          category={c}
          list={queryList.data}
          sortDisabled={sortCategoryItems.isPending}
          />
          ))}
        </DndContext> -->
        <div>
          <Button variant="linkMuted" size="sm">
            <!-- on:click={() => $createCategory.mutate()}
            disabled={$createCategory.isLoading} -->
            <Plus class="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</LayoutApp>
