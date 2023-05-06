<script lang="ts">
  import Logo from "./Logo.svelte";

  import type { Record } from "pocketbase";

  export let lists: Record[];
  export let items: Record[];
</script>

<Logo />
<nav class="list-nav p-4">
  <span class="font-bold uppercase">Lists</span>
  <ul>
    {#each lists as list}
      <li>
        <a href={`/${list.id}`} data-sveltekit-preload-data>{list.name}</a>
      </li>
    {/each}
  </ul>
</nav>

<ul>
  {#each items as item}
    <li>{item.name}</li>
  {/each}
</ul>
