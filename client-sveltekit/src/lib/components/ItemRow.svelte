<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import ItemImage from "./ItemImage.svelte";
  import Button from "./ui/button/button.svelte";
  import { Minus, Plus } from "lucide-svelte";

  export let listItem: RecordModel;
</script>

<div
  class="grid grid-cols-[auto_1fr_2fr_3rem_3.5rem] items-center gap-3 py-2 text-sm"
>
  {#if listItem.expand && "item" in listItem.expand}
    <ItemImage item={listItem.expand.item} />
    <span>{listItem.expand.item.name}</span>
    <span class="text-muted-foreground">
      {listItem.expand.item.description}
    </span>
    <span class="">{listItem.expand.item.weight_g}g</span>
    <span class="justify-self-end flex gap-1 items-center">
      <Button variant="ghost" size="icon" class="h-5 w-5">
        <Minus class="h-3 w-3" />
      </Button>
      {listItem.quantity}
      <Button variant="ghost" size="icon" class="h-5 w-5">
        <Plus class="h-3 w-3" />
      </Button>
    </span>
  {:else}
    No item information
  {/if}
</div>
