<script lang="ts">
  import { onMount } from "svelte";
  import App from "../App.svelte";
  import { currentUser, pb } from "./../lib/pocketbase";
  import EditableDiv from "./EditableDiv.svelte";

  import Item from "./Item.svelte";

  let categories = [];

  async function getList() {
    categories = await pb.collection("list_categories").getFullList(undefined, {
      filter: `list="${$currentUser.selected_list}"`,
      expand: "categories_items(category).item",
    });
  }

  onMount(getList);

  $: console.log(categories);
</script>

<div class="flex flex-col gap-4">
  {#each categories as category (category.id)}
    <div class="grid grid-cols-[100px_1fr_2fr_60px_60px] divide-y">
      <div class="font-bold col-span-3">{category.name}</div>
      <div class="font-bold text-center">Weight</div>
      <div class="font-bold text-center">Qty</div>
      {#each category.expand["categories_items(category)"] || [] as item (item.id)}
        <Item item={item.expand.item} />
      {/each}
      <img src="" alt="">
      <EditableDiv></EditableDiv>
      <EditableDiv></EditableDiv>
      <EditableDiv></EditableDiv>
    </div>
  {/each}
</div>
