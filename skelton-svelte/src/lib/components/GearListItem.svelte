<script lang="ts">
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

  import type { Record } from "pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import DragHandle from "./DragHandle.svelte";

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
  class="flex"
  draggable={true}
  on:dragstart={(e) => {
    if (e.dataTransfer) e.dataTransfer.setData("text/plain", item.id);
  }}
>
  <span class="badge bg-primary-500">▶︎</span>
  <span class="flex-1">
    <dt>{item.name}</dt>
    <dd>{item.description}</dd>
  </span>
  <span>{item.weight_g}g</span>
  <span>
    <DeleteButton onClick={() => deleteGear(item.id)} name={item.name} />
  </span>
</div>
