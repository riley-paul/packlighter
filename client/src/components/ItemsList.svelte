<script>
  import { onMount } from "svelte";
  import { pb } from "../lib/pocketbase";

  let items = [];
  onMount(async () => {
    items = await pb.collection("items").getFullList();
  });
</script>

<ul class="divide-y">
  {#each items as item}
    <li class="py-1">
      <div class="flex justify-between items-center">
        <div>
          {item.name}
          <p class="text-slate-500">{item.description}</p>
        </div>
        <i class="fa-solid fa-x px-3" />
      </div>
    </li>
  {/each}
</ul>
