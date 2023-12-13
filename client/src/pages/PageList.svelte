<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Button } from "@/components/ui/button";
  import { Loader2, Plus } from "lucide-svelte";
  import { useList, useUpdateList } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import Category from "@/components/Category.svelte";
  import { useCreateCategory } from "@/hooks/useCategory";
  import { Input } from "@/components/ui/input";

  export let params = { listId: "" };

  $: list = useList(params.listId);
  $: updateList = useUpdateList();
  $: createCategory = useCreateCategory();

  // let name = $list.data?.name ?? "";
</script>

<LayoutApp>
  <span slot="title">
    {#if $list.data}
      <Input bind:value={$list.data.name} />
    {/if}
  </span>
  <Card class="@container h-fit flex-1 p-6">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <div class="flex w-full items-center justify-center py-24">
        <Loader2 class="text-primary h-8 w-8 animate-spin" />
      </div>
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
            <Plus class="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>
    {/if}
  </Card>
</LayoutApp>
