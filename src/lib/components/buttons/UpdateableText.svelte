<script lang="ts">
  export let value: string;
  export let action: string;
  export let name: string;
  export let classes: string = "";
  export let auxiliaryData: object = {};
</script>

<form {action} method="post">
  <input
    bind:value
    id={name}
    {name}
    type="text"
    class="focus:bg-gray-50 focus:text-gray-900 w-full {classes}"
    {...$$restProps}
  />
  {#each Object.entries(auxiliaryData) as [itemName, itemValue]}
    <input hidden id={itemName} name={itemName} value={itemValue} />
  {/each}
  <slot />
  <input type="submit" hidden />
</form>
