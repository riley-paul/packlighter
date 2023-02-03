<script lang="ts">
  import { onMount } from "svelte";
  import App from "../App.svelte";
  import { currentUser, pb } from "./../lib/pocketbase";

  let categories = [];

  async function getList() {
    categories = await pb.collection("list_categories").getFullList(undefined, {
      filter: `list = "${$currentUser.selected_list}"`,
      expand: "categories_items(category).item",
    });
  }

  onMount(getList);

  $: console.log(categories);
</script>

<ul>
  {#each categories as category (category.id)}
    <li>{category.name}</li>
    <ul>
      {#each category.expand as item (item.id)}
        <li>{item.name}</li>
      {/each}
    </ul>
  {/each}
</ul>
