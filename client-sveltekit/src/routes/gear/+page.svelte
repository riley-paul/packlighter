<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  const { items } = data;
</script>

<h2>Gear</h2>

<ul>
  {#each items as item}
    <li>{item.name}</li>
  {/each}
</ul>
