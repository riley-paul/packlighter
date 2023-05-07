<script lang="ts">
  export let onClick: () => Promise<void>;
  export let entity = "";
</script>

<button
  class="text-left text-gray-500 hover:text-secondary-500 transition-colors w-fit"
  on:click={onClick}
>
  <i class="fa-plus fa-solid" />
  {["Create new", entity, "..."].join(" ")}
</button>
