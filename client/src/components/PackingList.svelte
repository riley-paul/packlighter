<script lang="ts">
  import { onMount } from "svelte";
  import { currentUser, pb } from "./../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  import Gear from "./Gear.svelte";

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

  $: $currentUser, getList();

  onMount(getList);

  // debug
  $: console.log(categories);
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
    <table class="table-fixed">
      <thead>
        <tr class="text-lg">
          <th colspan="3" class="text-left">{category.name}</th>
          <th class="w-1/12">Weight</th>
          <th class="w-1/12">Qty</th>
          <th class="w-10">
            <div class="hide">
              <DeleteButton onClick={() => removeCategory(category)} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        {#each category.expand["categories_gear(category)"] || [] as gear (gear.id)}
          <Gear item={gear.expand.gear} />
        {/each}
      </tbody>
    </table>
    <button class="text-left"
      ><i class="fa-plus fa-solid" /> Create new item...</button
    >
  {/each}
</div>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
  
</style>
