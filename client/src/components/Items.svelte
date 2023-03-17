<script>
  import { onMount } from "svelte";
  import { pb } from "../lib/pocketbase";

  let searchTerm = "";
  let items = [];
  let filteredItems = [];

  onMount(async () => {
    items = await pb.collection("items").getFullList();
  });

  $: filteredItems = items.filter((item) => {
    const combined = (item.name + item.description).toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });
</script>

<input
  type="text"
  class="px-4 py-1 rounded bg-slate-500 w-full text-white placeholder:text-gray-200"
  placeholder="Search..."
  bind:value={searchTerm}
/>

<ul class="divide-y px-2 py-1 overflow-y-scroll bg-slate-700 rounded">
  {#each filteredItems as item}
    <li class="py-1">
      <div class="flex justify-between items-center">
        <div>
          {item.name}
          <p class="text-slate-500">{item.description}</p>
        </div>
        <div class="flex items-center">
          <span>{item.weight_g}g</span>
          <i class="fa-solid fa-x px-3" />
        </div>
      </div>
    </li>
  {/each}
</ul>
