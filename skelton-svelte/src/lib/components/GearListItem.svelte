<script lang="ts">
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

  import type { Record } from "pocketbase";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import DragHandle from "./buttons/DragHandle.svelte";

  export let item: Record;

  async function deleteGear(id: string) {
    try {
      await pb.collection("lists").delete(id);
      invalidateAll();
      console.log("list updated");
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
    <DeleteButton onClick={() => deleteGear(item.id)} name={item.name} />
  </span>
</div>
