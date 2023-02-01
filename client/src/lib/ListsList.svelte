<script>
  import { onMount } from "svelte";
  import { pb, currentUser } from "./pocketbase";
  import { currentList } from "../stores";

  let lists = [];
  onMount(async () => {
    lists = await pb.collection("lists").getFullList();
    currentList.set(lists[0]);
  });

  let open = false;

  async function updateList() {
    try {
      const updatedList = await pb
        .collection("lists")
        .update(currentList.id, {
          name: currentList.name,
          description: currentList.description,
        });
      console.log("list updated");
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="bg-slate-50">
  <div class="flex justify-between items-center text-xl font-bold">
    <input
      type="text"
      placeholder="List Name"
      bind:value={$currentList.name}
      on:change={updateList}
      class="flex-1"
    />
    <button on:click={() => (open = !open)}>
      <i class="fa-solid p-2 {open ? 'fa-caret-up' : 'fa-caret-down'}" />
    </button>
  </div>
  {#if open}
    <ul class="flex flex-col divide-y">
      {#each lists.filter((i) => i.id !== $currentList.id) as list}
        <button
          on:click={() => {
            currentList.set(list);
            open = false;
          }}
        >
          <li class="flex justify-between items-center py-1">
            <span class="text-lg">{list.name}</span>
            <i class="fa-solid fa-trash" />
          </li>
        </button>
      {/each}
    </ul>
  {:else}
    <div
      contenteditable
      bind:textContent={$currentList.description}
      on:input={updateList}
      class="text-sm py-1 bg-white"
    />
  {/if}
</div>
