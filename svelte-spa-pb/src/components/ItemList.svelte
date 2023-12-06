<script lang="ts">
  import { useItems } from "@/hooks/useItem";
  import { Input } from "./ui/input";
  import { Button } from "./ui/button";
  import { Plus } from "lucide-svelte";
  import ItemListItem from "./ItemListItem.svelte";

  let searchTerm = "";
  const items = useItems();
</script>

<div class="p-2 border-b">
  <div class="flex items-center gap-2 justify-between mb-2">
    <h2 class="text-sm font-medium">Gear</h2>
    <Button size="sm" variant="ghost">
      <Plus class="h-4 w-4 mr-2" />
      New Gear
    </Button>
  </div>
  <Input
    type="search"
    placeholder="Search..."
    class="bg-card"
    bind:value={searchTerm}
  />
</div>
<div class="flex-1 overflow-auto">
  {#if $items.isError}
    <p>Error: {$items.error}</p>
  {:else if $items.isLoading}
    <p>Loading...</p>
  {:else if $items.data !== undefined}
    {#each $items.data as item (item.id)}
      <ItemListItem {item} />
    {/each}
  {/if}
</div>
