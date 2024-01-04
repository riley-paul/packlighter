<script lang="ts">
  import { Card } from "@/components/ui/card";
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Loader2 } from "lucide-svelte";
  import { useList } from "@/hooks/useList";
  import ListHeader from "@/components/ListHeader.svelte";
  import CategoryList from "@/components/CategoryList.svelte";
  import LayoutIconTitleSubtitle from "@/layouts/LayoutIconTitleSubtitle.svelte";
  import { CATEGORY_NAME_CLASS } from "@/lib/constants";
  import { waitForElm } from "@/lib/helpers";
  import { tick } from "svelte";
  import WeightChart from "@/components/WeightChart.svelte";
  import WeightTable from "@/components/WeightTable.svelte";

  export let params = { listId: "" };

  $: list = useList(params.listId);

  const handleCategoryCreated = (ev: CustomEvent<{ id: string }>) =>
    tick().then(() =>
      waitForElm<HTMLInputElement>(
        `#${ev.detail.id} input.${CATEGORY_NAME_CLASS}`,
      ).then((element) => {
        element?.scrollIntoView({ behavior: "smooth" });
        element?.focus();
      }),
    );
</script>

<LayoutApp pageTitle={$list.data?.name}>
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
        {#if $list.data.show_weights}
          <div class="flex justify-center">
            <div class="flex items-center gap-8">
              <WeightChart list={$list.data} />
              <WeightTable list={$list.data} />
            </div>
          </div>
        {/if}
        <ListHeader list={$list.data} />
        <CategoryList
          list={$list.data}
          on:categoryCreated={handleCategoryCreated}
        />
      </div>
    {/if}
  </Card>
</LayoutApp>
