<script lang="ts">
  import EditableDiv from "$lib/components/buttons/EditableDiv.svelte";
  import CreateButton from "$lib/components/buttons/CreateButton.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if !data.list}
  Could not find that list
{:else}
  <form method="post" action="?/updateList" class="flex flex-col gap-2">
    <input
      bind:value={data.list.name}
      class="bg-inherit cursor-text focus:bg-gray-50 focus:text-gray-900 flex-1 text-orange-500 text-3xl font-bold"
      placeholder="List Name"
    />
    <input
      bind:value={data.list.description}
      class="bg-inherit cursor-text focus:bg-gray-50 focus:text-gray-900 text-gray-700"
      placeholder="List Description"
    />
  </form>
  <br />
  <div class="flex flex-col gap-4">
    {#each data.list.categories as category (category.id)}
      {category.name}
      <!-- <Category
      {category}
      handleRemove={() => removeCategory(category.id)}
      handleCreate={() => createItem(category.id)}
      handleDrop={(e) => handleDrop(e, category.id)}
    >
      {#each category.expand["categories_gear(category)"] || [] as gear (gear.id)}
        <Gear
          item={gear.expand.gear}
          categoryItem={gear}
          handleRemove={() => removeItem(gear.id, gear.expand.gear)}
          {getGear}
        />
      {/each}
    </Category> -->
    {/each}
    <CreateButton entity="category" />
  </div>
{/if}
