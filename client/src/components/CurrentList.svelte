<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "../lib/pocketbase";
  import EditableDiv from "./EditableDiv.svelte";

  // state
  let selectedList = { name: "", description: "", id: "" };

  onMount(getList);

  async function getList() {
    selectedList = await pb
      .collection("lists")
      .getOne($currentUser.selected_list);
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

  $: $currentUser, getList()

</script>

<EditableDiv
  bind:content={selectedList.name}
  classes="flex-1 text-red-500 text-3xl"
  placeholder="List Name"
  handleBlur={editList}
/>
<EditableDiv
  bind:content={selectedList.description}
  classes="text-gray-700"
  placeholder="List Description"
  handleBlur={editList}
/>
