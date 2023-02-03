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

  async function editList() {
    try {
      const { name, description } = selectedList;
      await pb.collection("lists").update($currentUser.selected_list, {
        name,
        description,
      });
      console.log("list updated");
    } catch (err) {
      console.error(err);
    }
  }

  async function addList() {
    try {
      const newList = await pb
        .collection("lists")
        .create({ user: $currentUser.id });
      getLists()
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
      getLists()
    } catch (err) {
      console.log("Could not delete list");
      console.error(err);
    }
  }
</script>

<header class="bg-slate-800 text-gray-50 p-2">
  <div class="flex text-3xl font-bold justify-between items-start gap-2 py-2">
    <EditableDiv
      bind:content={selectedList.name}
      classes="flex-1 text-red-500"
      placeholder="List Name"
      handleBlur={editList}
      handleFocus={() => (open = false)}
    />
    <OpenButton bind:open classes="text-gray-300" />
  </div>
  {#if !open}
    <div in:slide>
      <EditableDiv
        bind:content={selectedList.description}
        classes="text-gray-300"
        placeholder="List Description"
        handleBlur={editList}
      />
    </div>
  {/if}

  {#if open}
    <div in:slide>
      <ul class="flex flex-col gap-1.5">
        {#each lists.filter((i) => i.id !== selectedList.id) as list (list.id)}
          <li class="flex justify-between items-center">
            <button
              class="text-lg font-bold flex-1 text-left"
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
      <button
        class="px-4 py-1 rounded bg-slate-700 w-full mt-4"
        on:click={addList}><i class="fa-regular fa-plus" /> Add List</button
      >
    </div>
  {/if}
</header>
