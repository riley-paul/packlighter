<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import ItemImage from "./ItemImage.svelte";
  import Button from "./ui/button/button.svelte";
  import { Minus, Plus } from "lucide-svelte";
  import Item from "./Item.svelte";
  import Counter from "./Counter.svelte";

  export let listItem: RecordModel;
</script>

<div class="grid grid-cols-[1fr_auto] items-center gap-3">
  {#if listItem.expand && "item" in listItem.expand}
    <Item item={listItem.expand.item} />
    <Counter value={listItem.quantity} />
  {:else}
    No item information
  {/if}
</div>
