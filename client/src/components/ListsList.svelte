<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";

  export let lists = [];
  export let getLists = () => undefined;

  onMount(getLists);

  // compute
  $: selectedList =
    lists.find((i) => i.id === $currentUser.selected_list) || selectedList;

  // methods
  async function selectList(id) {
    try {
      await pb
        .collection("users")
        .update($currentUser.id, { selected_list: id });
    } catch (err) {
      alert("Could not change lists");
      console.log("Could not change lists");
      console.error(err);
    }
  }

  async function addList() {
    try {
      const newList = await pb
        .collection("lists")
        .create({ user: $currentUser.id });
      getLists();
      selectList(newList.id);
    } catch (err) {
      console.log("could not create a new list");
      console.error(err);
    }
  }

  async function removeList(id) {
    try {
      await pb.collection("lists").delete(id);
      getLists();
    } catch (err) {
      alert("Could not delete list");
      console.log("Could not delete list");
      console.error(err);
    }
  }
</script>

<button class="px-4 py-1 rounded bg-slate-500 w-full" on:click={addList}
  ><i class="fa-regular fa-plus" /> Add List</button
>
<ul class="bg-slate-700 px-2 overflow-y-scroll rounded divide-y">
  {#each lists as list (list.id)}
    <li class="flex justify-between items-center py-2">
      <button
        class="text-lg flex-1 text-left"
        class:text-orange-500={list.id === $currentUser.selected_list}
        on:click={() => selectList(list.id)}
      >
        {list.name || "Unnamed List"}
      </button>
      <div class:hidden={list.id === $currentUser.selected_list} class="hide">
        <DeleteButton onClick={() => removeList(list.id)} name={list.name} />
      </div>
    </li>
  {/each}
</ul>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > .hide {
    visibility: visible;
  }
</style>
