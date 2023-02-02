<script>
  import { onMount } from "svelte";
  import { pb, currentUser } from "./pocketbase";

  let currentList = {};
  let lists = [];
  let open = false;

  onMount(async () => {
    lists = await pb.collection("lists").getFullList();
    currentList =
      lists.find((i) => i.id === $currentUser.currentList) || lists[0];
  });

  async function updateCurrentList(id) {
    await pb.collection("users").update($currentUser.id, { currentList: id });
    currentList = lists.find((i) => i.id === id);
  }

  async function updateList() {
    try {
      const updatedList = await pb
        .collection("lists")
        .update($currentUser.currentList, {
          name: currentList.name,
          description: currentList.description,
        });
      console.log("list updated");
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="bg-slate-500">
  <div class="flex justify-between items-center text-xl font-bold">
    <input
      type="text"
      placeholder="List Name"
      class="flex-1"
      bind:value={currentList.name}
      on:change={updateList}
    />
    <button on:click={() => (open = !open)}>
      <i class="fa-solid p-2 {open ? 'fa-caret-up' : 'fa-caret-down'}" />
    </button>
  </div>
  {#if open}
    <ul class="flex flex-col divide-y">
      {#each lists.filter((i) => i.id !== $currentUser.currentList) as list}
        <button
          on:click={() => {
            updateCurrentList(list.id);
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
    <textarea
      placeholder="List Description"
      bind:value={currentList.description}
      on:change={updateList}
      class="text-sm py-1 w-full h-auto"
    />
  {/if}
</div>
