<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import Category from "@/components/Category.svelte";
  import { useCreateCategory } from "@/hooks/useCategory";

  export let params = { listId: "" };

  $: list = useList(params.listId);
  $: createCategory = useCreateCategory();
</script>

<LayoutApp>
  <Card class="@container h-fit flex-1 p-6">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <p>Loading...</p>
    {:else if $list.data}
      <div class="flex flex-col gap-4">
        <ListHeader list={$list.data} />
        {#each $list.data.categories as category (category.id)}
          <Category {category} bind:list={$list.data} />
        {/each}
        <div>
          <Button
            variant="linkMuted"
            size="sm"
            on:click={() => $createCategory.mutate(params.listId)}
            disabled={$createCategory.isPending}
          >
            <Plus class="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</LayoutApp>
