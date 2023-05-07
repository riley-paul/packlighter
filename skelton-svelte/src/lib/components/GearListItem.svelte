<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  import type { Record } from "pocketbase";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import DragHandle from "./buttons/DragHandle.svelte";

  export let item: Record;

  async function deleteGear() {
    try {
      await pb.collection("gear").delete(item.id);
      invalidateAll();
      console.log("gear deleted");
    } catch (err) {
      alert("Could not delete gear");
      console.log("Could not delete gear");
      console.error(err);
    }
  }
</script>

<div
  class="flex hover:bg-primary-500/5"
  draggable={true}
  on:dragstart={(e) => {
    if (e.dataTransfer) e.dataTransfer.setData("text/plain", item.id);
  }}
>
  <span class="flex-1">
    <dt class="whitespace-normal">{item.name}</dt>
    <dd class="whitespace-normal">{item.description}</dd>
  </span>
  <small>{item.weight_g}g</small>
  <span>
    <DeleteButton onClick={deleteGear} name={item.name} />
  </span>
</div>
