<script lang="ts">
  import CreateButton from "$lib/components/buttons/CreateButton.svelte";
  import type { PageData } from "./$types";
  import { invalidateAll } from "$app/navigation";

  import CategoryItem from "$lib/components/CategoryItem.svelte";
  import GearItem from "$lib/components/GearItem.svelte";
  import EditableDiv from "$lib/components/buttons/EditableDiv.svelte";

  import type { Gear, ListCategory, List } from "@prisma/client";

  export let data: PageData;

  const updateList: () => Promise<void> = async () => {
    await fetch(`/api/list/${data.list.id}`, {
      method: "PATCH",
      body: JSON.stringify(data.list),
      headers: { "content-type": "application/json" },
    });
    await invalidateAll();
  };

  console.log(data.list);
</script>

{#if !data.list}
  Could not find that list
{:else}
  <EditableDiv
    bind:content={data.list.name}
    classes="flex-1 text-orange-500 text-3xl font-bold"
    placeholder="List Name"
    handleBlur={updateList}
  />
  <EditableDiv
    bind:content={data.list.description}
    classes="text-gray-700"
    placeholder="List Description"
    handleBlur={updateList}
  />
  <br />
  <div class="flex flex-col gap-4">
    {#each data.list.categories as category}
      <CategoryItem bind:category {updateList}>
        {#each category.gear as gearEntry}
          <GearItem bind:gearEntry {updateList} />
        {/each}
      </CategoryItem>
    {/each}
    <CreateButton action="?/addCategory" entity="category" />
  </div>
{/if}
