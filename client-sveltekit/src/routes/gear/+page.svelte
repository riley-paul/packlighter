<script lang="ts">
  import Item from "../../lib/components/Item.svelte";

  import { Separator } from "$components/ui/separator";
  import { cn } from "$lib/utils";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  const { items } = data;
</script>

<h2 class="text-lg font-medium mb-2">Gear</h2>

<ul class="grid border rounded-md px-2 bg-background">
  {#each items as item, idx}
    <Item {item} />
    {#if idx < items.length - 1}
      <Separator />
    {/if}
  {/each}
</ul>
