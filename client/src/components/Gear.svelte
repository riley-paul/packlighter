<script lang="ts">
  import { pb } from "../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  export let item;
  export let handleRemove = () => undefined;

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

<tr class="border-y hover:bg-gray-50">
  <td class="w-[100px]">
    <img src={item.image_url} alt="" />
  </td>
  <td class="w-1/6">
    <EditableDiv
      bind:content={item.name}
      handleBlur={updateGear}
      placeholder="Name"
    />
  </td>
  <td class="text-gray-500">
    <EditableDiv
      bind:content={item.description}
      handleBlur={updateGear}
      placeholder="Description"
    />
  </td>
  <td class="w-8">
    <button title="Add Image" class="hide">
      <i class="hover:text-gray-500 transition-colors fa-solid fa-camera" />
    </button>
  </td>
  <td class="w-8">
    <button
      title="Consumable Weight"
      class:hide={!item.cons_weight}
      class:text-sky-500={item.cons_weight}
      on:click={() => {
        item.cons_weight = !item.cons_weight;
        updateGear();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-shirt" />
    </button>
  </td>
  <td class="w-8">
    <button
      title="Worn Weight"
      class:hide={!item.worn_weight}
      class:text-sky-500={item.worn_weight}
      on:click={() => {
        item.worn_weight = !item.worn_weight;
        updateGear();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-utensils" />
    </button>
  </td>
  <td class="text-center">
    <EditableDiv bind:content={item.weight_g} handleBlur={updateGear} />
  </td>
  <td class="text-center">{1}</td>
  <td class="text-center">
    <div class="hide">
      <DeleteButton onClick={handleRemove} askConfirm={false} />
    </div>
  </td>
</tr>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
