<script>
  import { onMount } from "svelte";
  import { prop_dev } from "svelte/internal";
  import { pb } from "../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";

  let searchTerm = "";
  let gear = [];
  let filteredGear = [];

  async function getGear() {
    gear = await pb.collection("gear").getFullList();
  }

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
  type="text"
  class="px-4 py-1 rounded bg-slate-500 w-full text-white placeholder:text-gray-200"
  placeholder="Search..."
  bind:value={searchTerm}
/>

<ul class="divide-y px-2 py-1 overflow-y-scroll bg-slate-700 rounded">
  {#each filteredGear as item}
    <li class="py-2">
      <div class="flex justify-between items-center">
        <div>
          {item.name}
          <p class="text-slate-500">{item.description}</p>
        </div>
        <div class="flex items-center gap-2">
          <span>{item.weight_g}g</span>
          <div class="hide">
            <DeleteButton
              onClick={() => removeGear(item.id)}
              name={item.name}
            />
          </div>
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
