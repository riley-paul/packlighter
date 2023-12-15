<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Loader2 } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import CategoryList from "@/components/CategoryList.svelte";
  import LayoutIconTitleSubtitle from "@/layouts/LayoutIconTitleSubtitle.svelte";

  export let params = { listId: "" };

  $: list = useList(params.listId);
</script>

<LayoutApp>
  <Card class="@container h-fit flex-1 p-6">
    {#if $list.isError}
      <p>Error: {$list.error}</p>
    {:else if $list.isLoading}
      <LayoutIconTitleSubtitle>
        <Loader2 class="text-primary h-10 w-10 animate-spin" />
        <span slot="title">Loading your list</span>
        <span slot="subtitle">Please wait one moment...</span>
      </LayoutIconTitleSubtitle>
    {:else if $list.data}
      <div class="flex flex-col gap-4">
        <ListHeader list={$list.data} />
        <CategoryList list={$list.data} />
      </div>
    {/if}
  </Card>
</LayoutApp>
