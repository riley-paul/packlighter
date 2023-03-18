<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import EditableDiv from "./EditableDiv.svelte";

  // state
  export let getLists = () => undefined;
  let selectedList = { name: "", description: "" };

  onMount(getList);

  async function getList() {
    selectedList = await pb
      .collection("lists")
      .getOne($currentUser.selected_list);
  }

  async function editList() {
    try {
      await pb
        .collection("lists")
        .update($currentUser.selected_list, { ...selectedList });
      console.log("list updated");
      getLists();
    } catch (err) {
      console.error(err);
    }
  }

  $: $currentUser, getList()

</script>

<div class="flex flex-col gap-2">
  <EditableDiv
    bind:content={selectedList.name}
    classes="flex-1 text-orange-500 text-3xl font-bold"
    placeholder="List Name"
    handleBlur={editList}
  />
  <EditableDiv
    bind:content={selectedList.description}
    classes="text-gray-700"
    placeholder="List Description"
    handleBlur={editList}
  />
</div>
