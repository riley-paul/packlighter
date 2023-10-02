<script lang="ts">
  import ItemImage from "./ItemImage.svelte";
  import type { RecordModel } from "pocketbase";

  export let item: RecordModel;
</script>

<section class="py-2 text-sm flex gap-2 items-center">
  <ItemImage {item} />
  <div class="w-full">
    <div class="flex w-full justify-between items-center">
      <span>{item.name}</span>
      <span>{item.weight_g}g</span>
    </div>
    <p class="text-muted-foreground">{item.description}</p>
  </div>
</section>
