<script lang="ts">
  import { pb } from "../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  export let item;

  async function removeFromList() {
    await pb.collection("categories_gear");
  }

  async function updateGear() {
    try {
      await pb.collection("gear").update(item.id, { ...item });
      console.log("Gear updated");
    } catch (err) {
      alert("Could not update gear");
      console.log("Could not update gear");
      console.error(err);
    }
  }
</script>

<tr class="border-t hover:bg-gray-50">
  <td class="w-[100px]">
    <img src={item.image_url} alt="" />
  </td>
  <td class="w-1/6"
    ><EditableDiv bind:content={item.name} handleBlur={updateGear} /></td
  >
  <td class="text-gray-500"
    ><EditableDiv bind:content={item.description} handleBlur={updateGear} /></td
  >
  <td class="text-center">{item.weight_g}</td>
  <td class="text-center">{1}</td>
  <td class="text-center"
    ><div class="hide">
      <DeleteButton onClick={removeFromList} />
    </div></td
  >
</tr>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
