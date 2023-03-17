<script lang="ts">
  import { onMount } from "svelte";
  import { currentUser, pb } from "./../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  import Gear from "./Gear.svelte";
  import Category from "./Category.svelte";

  let categories = [];

  async function getList() {
    categories = await pb.collection("list_categories").getFullList(undefined, {
      filter: `list="${$currentUser.selected_list}"`,
      expand: "categories_gear(category).gear",
    });
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

  async function updateCategory(id, category) {
    try {
      await pb.collection("list_categories").update(id, { ...category });
      console.log("Category updated");
      getList();
    } catch (err) {
      alert("Could not remove category");
      console.log("Could not remove category");
      console.error(err);
    }
  }

  $: $currentUser, getList();

  onMount(getList);

  // debug
  // $: console.log(categories);
</script>

<!-- <div class="flex flex-col gap-4">
  {#each categories as category (category.id)}
    <div class="grid grid-cols-[100px_1fr_2fr_60px_60px] gap-2">
      <div class="font-bold col-span-3">{category.name}</div>
      <div class="font-bold text-center">Weight</div>
      <div class="font-bold text-center">Qty</div>
      {#each category.expand["categories_items(category)"] || [] as item (item.id)}
        <Item item={item.expand.item} />
      {/each}
      <img src="" alt="" />
      <EditableDiv />
      <EditableDiv />
      <EditableDiv />
    </div>
  {/each}
</div> -->

<div class="flex flex-col gap-4">
  {#each categories as category (category.id)}
    <Category {category}>
      {#each category.expand["categories_gear(category)"] || [] as gear (gear.id)}
        <Gear item={gear.expand.gear} />
      {/each}
    </Category>
  {/each}
  <button
    class="text-left text-gray-500 hover:underline"
    on:click={createCategory}
  >
    <i class="fa-plus fa-solid" /> Create new category...
  </button>
</div>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
