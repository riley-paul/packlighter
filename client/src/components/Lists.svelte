<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import { slide } from "svelte/transition";
  import OpenButton from "./OpenButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  // state
  let open = false;
  let lists = [];
  let selectedList = { name: "", description: "", id: "" };

  async function getLists() {
    lists = await pb.collection("lists").getFullList();
  }

  onMount(getLists);

  // debug
  // $: console.log("lists", lists);
  // $: console.log("selected list", selectedList);

  // compute
  $: selectedList =
    lists.find((i) => i.id === $currentUser.selected_list) || selectedList;

  // methods
  async function selectList(id) {
    try {
      await pb
        .collection("users")
        .update($currentUser.id, { selected_list: id });
      open = false;
    } catch (err) {
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
      const listName = lists.find((i) => i.id === id).name;
      const confirmation = confirm(
        `Are you sure you want to delete the list '${listName}'`
      );
      if (!confirmation) return;

      await pb.collection("lists").delete(id);
      getLists();
    } catch (err) {
      console.log("Could not delete list");
      console.error(err);
    }
  }
</script>

<button class="px-4 py-1 rounded bg-slate-500 w-full" on:click={addList}
  ><i class="fa-regular fa-plus" /> Add List</button
>
<ul class="flex flex-col gap-1.5 bg-slate-700 p-2 overflow-scroll">
  {#each lists.filter((i) => i.id !== selectedList.id) as list (list.id)}
    <li class="flex justify-between items-center">
      <button
        class="text-lg flex-1 text-left"
        on:click={() => selectList(list.id)}
      >
        {list.name || "Unnamed List"}
      </button>
      <button class="text-slate-500" on:click={() => removeList(list.id)}
        >delete</button
      >
    </li>
  {/each}
</ul>
