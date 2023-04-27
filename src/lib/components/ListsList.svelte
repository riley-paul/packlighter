<script lang="ts">
  import { onMount } from "svelte";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import DragHandle from "./buttons/DragHandle.svelte";

  export let lists: List[];
  // export let getLists = () => undefined;

  // onMount(getLists);

  // // compute
  // $: selectedList =
  //   lists.find((i) => i.id === $currentUser.selected_list) || selectedList;

  // // methods
  // async function selectList(id) {
  //   try {
  //     await pb
  //       .collection("users")
  //       .update($currentUser.id, { selected_list: id });
  //   } catch (err) {
  //     alert("Could not change lists");
  //     console.log("Could not change lists");
  //     console.error(err);
  //   }
  // }

  // async function addList() {
  //   try {
  //     const newList = await pb
  //       .collection("lists")
  //       .create({ user: $currentUser.id });
  //     getLists();
  //     selectList(newList.id);
  //   } catch (err) {
  //     console.log("could not create a new list");
  //     console.error(err);
  //   }
  // }

  // async function removeList(id) {
  //   try {
  //     await pb.collection("lists").delete(id);
  //     getLists();
  //   } catch (err) {
  //     alert("Could not delete list");
  //     console.log("Could not delete list");
  //     console.error(err);
  //   }
  // }
</script>



<style>
  .hide {
    visibility: hidden;
  }

  *:hover > .hide {
    visibility: visible;
  }
</style>
