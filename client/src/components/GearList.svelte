<script>
  import { onMount } from "svelte";
  import { prop_dev } from "svelte/internal";
  import { pb } from "../lib/pocketbase";

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
      const gearName = gear.find((i) => i.id === id).name;
      const confirmation = confirm(
        `Are you sure you want to delete the gear '${gearName}'`
      );
      if (!confirmation) return;

      await pb.collection("gear").delete(id);
      getGear();
    } catch (err) {
      alert("Could not delete gear")
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
    <li class="py-1">
      <div class="flex justify-between items-center">
        <div>
          {item.name}
          <p class="text-slate-500">{item.description}</p>
        </div>
        <div class="flex items-center">
          <span>{item.weight_g}g</span>
          <button on:click={() => removeGear(item.id)}>
            <i class="fa-solid fa-x px-3 hover:text-red-500" />
          </button>
        </div>
      </div>
    </li>
  {/each}
</ul>
