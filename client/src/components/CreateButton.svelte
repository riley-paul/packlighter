<script>
  export let onClick = () => undefined;
  export let entity = "";
</script>

<button class="text-left text-gray-500 hover:underline" on:click={onClick}>
  <i class="fa-plus fa-solid" />
  {["Create new", entity, "..."].join(" ")}
</button>
