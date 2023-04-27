<script lang="ts">
  import EditableDiv from "$lib/components/buttons/EditableDiv.svelte";
  import CreateButton from "$lib/components/buttons/CreateButton.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if !data.list}
  Could not find that list
{:else}
  <div class="flex flex-col gap-2">
    <EditableDiv
      bind:content={data.list.name}
      classes="flex-1 text-orange-500 text-3xl font-bold"
      placeholder="List Name"
      handleBlur={editList}
    />
    <EditableDiv
      bind:content={data.list.description}
      classes="text-gray-700"
      placeholder="List Description"
      handleBlur={editList}
    />
  </div>
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
    <CreateButton entity="category" onClick={createCategory} />
  </div>
{/if}
