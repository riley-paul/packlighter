<script lang="ts">
  import EditableDiv from "./buttons/EditableDiv.svelte";

  export let name: string;
  export let description: string;
  export let editList: () => undefined;
</script>

<div class="flex flex-col gap-2">
  <EditableDiv
    bind:content={name}
    classes="flex-1 text-orange-500 text-3xl font-bold"
    placeholder="List Name"
    handleBlur={editList}
  />
  <EditableDiv
    bind:content={description}
    classes="text-gray-700"
    placeholder="List Description"
    handleBlur={editList}
  />
</div>
