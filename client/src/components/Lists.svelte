<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import { slide } from "svelte/transition";

  // state
  let open = false;
  let lists = [];
  let selectedList = { name: "", description: "", id: "" };

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

  function handleKeypress(event: KeyboardEvent) {
    let pressedKey = event.key;
    let targetElement = event.target as HTMLDivElement;

    switch (pressedKey) {
      case "Escape":
        targetElement.blur();
        break;
      case "Enter":
        targetElement.blur();
        break;
    }
  }
</script>

<header class="bg-slate-800 text-gray-50 p-2">
  <div class="flex text-3xl font-bold justify-between items-start gap-2 py-2">
    <div
      id="selected-list-name"
      contenteditable="true"
      class="bg-inherit flex-1 text-red-500 cursor-text"
      data-ph="List Name"
      bind:textContent={selectedList.name}
      on:blur={editList}
      on:focus={() => (open = false)}
      on:keypress={handleKeypress}
    />
    <button class=" px-2 h-auto aspect-square" on:click={() => (open = !open)}
      ><i
        class="fa-regular {!open ? 'fa-square-plus' : 'fa-square-minus'}"
      /></button
    >
  </div>
  {#if !open}
    <div
      class="bg-inherit text-gray-300 cursor-text"
      contenteditable="true"
      id="selected-list-description"
      data-ph="List Description"
      in:slide
      bind:textContent={selectedList.description}
      on:blur={editList}
      on:keypress={handleKeypress}
    />
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
            <button on:click={() => removeList(list.id)}>delete</button>
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

<style>
  [contenteditable="true"]:empty:not(:focus):before {
    content: attr(data-ph);
    color: grey;
  }
</style>
