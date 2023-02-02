<script>
  import { onMount } from "svelte";
  import { pb } from "../lib/pocketbase";

  let items = [];
  onMount(async () => {
    items = await pb.collection("items").getFullList();
  });
</script>

<ul class="divide-y px-2 py-1">
  {#each items as item}
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
