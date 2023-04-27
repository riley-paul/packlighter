<script lang="ts">
  import { currentUser, pb } from "./../lib/pocketbase";

  import Gear from "./Gear.svelte";
  import Category from "./Category.svelte";
  import CreateButton from "./buttons/CreateButton.svelte";
  import Modal from "./buttons/Modal.svelte";

  export let getGear = () => undefined;
  let categories = [];

  async function getList() {
    categories = await pb.collection("list_categories").getFullList(undefined, {
      filter: `list="${$currentUser.selected_list}"`,
      expand: "categories_gear(category).gear",
    });
  }

  async function removeItem(categoryGearID, gear) {
    try {
      await pb.collection("categories_gear").delete(categoryGearID);
      if (!gear.name && !gear.description) {
        await pb.collection("gear").delete(gear.id);
      }
      getList();
      getGear();
    } catch (err) {
      alert("Could not remove item from category");
      console.log("Could not remove item from category");
      console.error(err);
    }
  }

  async function createItem(categoryID) {
    try {
      const newItem = await pb
        .collection("gear")
        .create({ user: $currentUser.id });
      await pb
        .collection("categories_gear")
        .create({ category: categoryID, gear: newItem.id, quantity: 1 });
      console.log("Item created");
      getList();
      getGear();
    } catch (err) {
      alert("Could not create new item");
      console.log("Could not create new item");
      console.error(err);
    }
  }

  async function addItem(itemID: string, categoryID: string) {
    try {
      await pb
        .collection("categories_gear")
        .create({ category: categoryID, gear: itemID, quantity: 1 });
      console.log("Item created");
      getList();
      getGear();
    } catch (err) {
      alert("Could not add item");
      console.log("Could not add item");
      console.error(err);
    }
  }

  function handleDrop(e: DragEvent, categoryID: string) {
    const itemID = e.dataTransfer.getData("text/plain");
    addItem(itemID, categoryID);
  }

  async function removeCategory(id) {
    try {
      await pb.collection("list_categories").delete(id);
      getList();
    } catch (err) {
      alert("Could not remove category");
      console.log("Could not remove category");
      console.error(err);
    }
  }

  async function createCategory() {
    try {
      await pb
        .collection("list_categories")
        .create({ list: $currentUser.selected_list });
      getList();
    } catch (err) {
      alert("Could not create new category");
      console.log("Could not create new category");
      console.error(err);
    }
  }

  $: $currentUser, getList();

  // debug
  $: console.log(categories);
</script>

<div class="flex flex-col gap-4">
  {#each categories as category (category.id)}
    <Category
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
    </Category>
  {/each}
  <CreateButton entity="category" onClick={createCategory} />
</div>
