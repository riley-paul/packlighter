<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  import Category from "$lib/components/Category.svelte";
  import Gear from "$lib/components/Gear.svelte";
  import CreateButton from "$lib/components/buttons/CreateButton.svelte";
  import EditableDiv from "$lib/components/buttons/EditableDiv.svelte";

  import type { PageData } from "./$types";
  import type { Record } from "pocketbase";

  export let data: PageData;
  console.log(data);

  console.log(JSON.stringify(data.categories, undefined, 2));

  async function updateList() {
    try {
      await pb.collection("lists").update(data.list.id, data.list);
      invalidateAll();
      console.log("list updated");
    } catch (err) {
      console.error(err);
    }
  }

  async function createCategory() {
    try {
      await pb.collection("list_categories").create({ list: data.list.id });
      invalidateAll();
      console.log("category created");
    } catch (err) {
      alert("Could not create new category");
      console.log("Could not create new category");
      console.error(err);
    }
  }
</script>

<div class="grid gap-2">
  <EditableDiv
    bind:content={data.list.name}
    classes="text-3xl font-bold"
    placeholder="List Name"
    handleBlur={updateList}
  />
  <EditableDiv
    bind:content={data.list.description}
    classes=""
    placeholder="List Description"
    handleBlur={updateList}
  />
  <div class="flex flex-col gap-4">
    {#each data.categories as category (category.id)}
      <Category {category}>
        {#if category.expand && "categories_gear(category)" in category.expand && Array.isArray(category.expand["categories_gear(category)"])}
          {#each category.expand["categories_gear(category)"] as categoryItem (categoryItem.id)}
            {#if !Array.isArray(categoryItem.expand.gear)}
              <Gear item={categoryItem.expand.gear} {categoryItem} />
            {/if}
          {/each}
        {/if}
      </Category>
    {/each}
    <CreateButton entity="category" onClick={createCategory} />
  </div>
</div>
