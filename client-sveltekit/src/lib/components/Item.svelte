<script lang="ts">
  import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-svelte";
  import ItemImage from "./ItemImage.svelte";
  import type { RecordModel } from "pocketbase";
  import { cn } from "$lib/utils";
  import { Button } from "./ui/button";

  let count = 1;

  export let item: RecordModel;
  export let showDragger = true;
  export let showQuantity = false;
</script>

<section
  class={cn(
    "py-2 text-sm grid gap-2 items-center",
    "grid-cols-[auto_1fr]",
    showDragger && !showQuantity && "grid-cols-[auto_auto_1fr]",
    !showDragger && showQuantity && "grid-cols-[auto_1fr_auto]",
    showDragger && showQuantity && "grid-cols-[auto_auto_1fr_auto]"
  )}
>
  {#if showDragger}
    <GripVertical class="h-4 w-4" />
  {/if}
  <ItemImage {item} />
  <div>
    <div class="flex w-full justify-between items-center">
      <span>{item.name}</span>
      <span>{item.weight_g}g</span>
    </div>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
  {#if showQuantity}
    <div class="flex items-center gap-1">
      <span><X class="h-4 w-4"/></span>
      <span class="w-4 text-center">{count}</span>
      <div class="flex flex-col divide-y border rounded">
        <button class="p-0.5" on:click={() => (count += 1)}>
          <ChevronUp class="h-3 w-3" />
        </button>
        <button class="p-0.5" on:click={() => (count -= 1)}>
          <ChevronDown class="h-3 w-3" />
        </button>
      </div>
    </div>
  {/if}
</section>
