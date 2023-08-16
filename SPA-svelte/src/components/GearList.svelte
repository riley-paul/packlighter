<script>
  import { onMount } from "svelte";
  import { pb } from "../lib/pocketbase";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import DragHandle from "./buttons/DragHandle.svelte";

  export let gear = [];
  export let getGear = () => undefined;

  let searchTerm = "";
  let filteredGear = [];

  onMount(getGear);

  $: filteredGear = gear.filter((item) => {
    const combined = (item.name + item.description).toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  async function removeGear(id) {
    try {
      await pb.collection("gear").delete(id);
      getGear();
    } catch (err) {
      alert("Could not delete gear");
      console.log("Could not delete gear");
      console.error(err);
    }
  }
</script>

<input
  type="search"
  class="px-4 py-1 rounded bg-slate-500 w-full text-white placeholder:text-gray-200"
  placeholder="Search..."
  bind:value={searchTerm}
/>

<ul class="divide-y px-2 py-1 overflow-y-scroll bg-slate-700 rounded">
  {#each filteredGear as item}
    <li
      class="py-2"
      draggable={true}
      on:dragstart={(e) => e.dataTransfer.setData("text/plain", item.id)}
    >
      <div class="flex gap-2 items-center">
        <div class="hide"><DragHandle /></div>
        <div class="flex-1">
          {item.name}
          <p class="text-slate-500">{item.description}</p>
        </div>
        <span>{item.weight_g}g</span>
        <div class="hide">
          <DeleteButton onClick={() => removeGear(item.id)} name={item.name} />
        </div>
      </div>
    </li>
  {/each}
</ul>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
