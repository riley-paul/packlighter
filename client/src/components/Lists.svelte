<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import { slide } from "svelte/transition";

  // state
  let open = true;
  let lists = [];
  let selectedList = { name: "", description: "" };

  onMount(async () => {
    lists = await pb.collection("lists").getFullList();
  });

  // debug
  $: console.log("lists", lists);
  $: console.log("selected list", selectedList);

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
      lists = await pb.collection("lists").getFullList();
      selectList(newList.id);
    } catch (err) {
      console.log("could not create a new list");
      console.error(err);
    }
  }

  async function removeList(id) {
    try {
      await pb.collection("lists").delete(id);
      lists = await pb.collection("lists").getFullList();
    } catch (err) {
      console.log("Could not delete list");
      console.error(err);
    }
  }
</script>

<header class="bg-slate-800 text-gray-50 px-2 py-4">
  <div class="flex">
    <input
      id="selected-list-name"
      class="bg-inherit text-3xl font-bold text-red-500"
      type="text"
      name="selected-list-name"
      placeholder="List Name"
      bind:value={selectedList.name}
      on:change={editList}
      on:focus={() => (open = false)}
    />
    <button on:click={() => (open = !open)}>{open ? "hide" : "show"}</button>
  </div>
  {#if !open}
    <textarea
      class="bg-inherit text-gray-300 w-full h-auto overflow-visible"
      name="selected-list-description"
      id="selected-list-description"
      placeholder="List Description"
      in:slide
      bind:value={selectedList.description}
      on:change={editList}
    />
  {/if}

  {#if open}
    <div in:slide>
      <ul>
        {#each lists.filter((i) => i.id !== selectedList.id) as list (list.id)}
          <li class="flex justify-between items-center">
            <button
              class="text-lg font-bold flex-1 text-left"
              on:click={() => selectList(list.id)}
            >
              {list.name || "Unnamed List"}
            </button>
            <button on:click={() => removeList(list.id)}>delete</button>
          </li>
        {/each}
      </ul>
      <div class="flex justify-center items-center">
        <button class="px-4 py-1 rounded bg-slate-700" on:click={addList}
          >new list</button
        >
      </div>
    </div>
  {/if}
</header>
