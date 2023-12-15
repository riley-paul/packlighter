<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Loader2 } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import CategoryList from "@/components/CategoryList.svelte";
  import { CATEGORY_NAME_CLASS } from "@/lib/constants";

  export let params = { listId: "" };

  $: list = useList(params.listId);

  const handleCreateCategory = () => {
    const names = document.querySelectorAll(`input.${CATEGORY_NAME_CLASS}`);
    (names[names.length - 1] as HTMLInputElement).focus();
  };
</script>

<LayoutApp>
  <Card class="@container h-fit flex-1 p-6">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <div class="flex w-full flex-col items-center justify-center py-24">
        <Loader2 class="text-primary h-10 w-10 animate-spin" />
        <h2 class="mb-1 mt-8 font-semibold">Loading your list</h2>
        <p class="text-muted-foreground text-sm">Please wait one moment...</p>
      </div>
    {:else if $list.data}
      <div class="flex flex-col gap-4">
        <ListHeader list={$list.data} />
        <CategoryList
          list={$list.data}
          on:categoryCreated={handleCreateCategory}
        />
      </div>
    {/if}
  </Card>
</LayoutApp>
