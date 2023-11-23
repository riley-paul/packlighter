<script lang="ts">
  import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-svelte";
  import ItemImage from "./ItemImage.svelte";
  import type { RecordModel } from "pocketbase";
  import { cn } from "$lib/utils";
  import { Button } from "./ui/button";

  export let item: RecordModel;
  export let showDragger = true;
</script>

<section
  class={cn(
    "py-2 text-sm grid gap-2 items-center",
    "grid-cols-[auto_1fr]",
    showDragger && "grid-cols-[auto_auto_1fr]"
  )}
>
  {#if showDragger}
    <GripVertical class="h-4 w-4" />
  {/if}
  <ItemImage {item} />
  <div>
    <div class="flex w-full justify-between items-center">
      <span>{item.name}</span>
      <span class="text-muted-foreground">{item.weight_g}g</span>
    </div>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
</section>
