<script lang="ts">
  export let action: string;
  export let itemId: number | string;
  export let name: string = "";
  const message =
    "Are you sure you want to delete " + (name ? `'${name}'` : "this") + "?";


</script>

<form {action} method="post" on:submit={() => confirm(message)}>
  <input type="text" name="itemId" id="itemId" value={itemId} hidden />
  <button
    class="hover:bg-orange-500 hover:text-white w-8 h-8 rounded-full text-gray-500 transition-colors"
  >
    <i class="fa-solid fa-trash text-base" />
  </button>
</form>
