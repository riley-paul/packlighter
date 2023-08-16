<script lang="ts">
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;
</script>

<div class="p-2 max-w-lg w-full">
  {#each data.lists as list}
    <p>{list.name}</p>
  {/each}

  <slot />
</div>
