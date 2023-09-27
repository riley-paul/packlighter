<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  const { items } = data;
</script>

<h2 class="text-lg font-medium">Gear</h2>

<ul>
  {#each items as item}
    <li>
      <div class="flex justify-between">
        <span>{item.name}</span><span>{item.weight_g}</span>
      </div>
    </li>
  {/each}
</ul>
