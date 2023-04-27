<script lang="ts">
  export let action: string;
  export let onClick = () => undefined;
  export let entity = "";
</script>

<form {action} method="post">
  <button
    class="text-left text-gray-500 hover:underline w-fit"
    on:click={onClick}
  >
    <i class="fa-plus fa-solid" />
    {["Create new", entity, "..."].join(" ")}
  </button>
</form>
