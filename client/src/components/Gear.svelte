<script lang="ts">
  import { pb } from "../lib/pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  export let item;
  export let categoryItem;
  export let handleRemove = () => undefined;
  export let getGear = () => undefined;

  async function updateGear() {
    try {
      await pb.collection("gear").update(item.id, { ...item });
      console.log("Gear updated");
      getGear();
    } catch (err) {
      alert("Could not update gear");
      console.log("Could not update gear");
      console.error(err);
    }
  }

  async function updateCategoryGear() {
    try {
      const { quantity, cons_weight, worn_weight } = categoryItem;
      await pb
        .collection("categories_gear")
        .update(categoryItem.id, { quantity, cons_weight, worn_weight });
      console.log("Gear category relation updated");
      getGear();
    } catch (err) {
      alert("Could not update category gear relation");
      console.log("Could not update category gear relation");
      console.error(err);
    }
  }
</script>

<tr class="border-y hover:bg-gray-50">
  <!-- image -->
  <td class="w-[100px]">
    <img src={item.image_url} alt="" />
  </td>

  <!-- name -->
  <td class="w-1/6">
    <EditableDiv
      bind:content={item.name}
      handleBlur={updateGear}
      placeholder="Name"
    />
  </td>

  <!-- description -->
  <td class="text-gray-500">
    <EditableDiv
      bind:content={item.description}
      handleBlur={updateGear}
      placeholder="Description"
    />
  </td>

  <!-- add image -->
  <td class="w-8">
    <button title="Add Image" class="hide">
      <i class="hover:text-gray-500 transition-colors fa-solid fa-camera" />
    </button>
  </td>

  <!-- consumable weight -->
  <td class="w-8">
    <button
      title="Consumable Weight"
      class:hide={!categoryItem.cons_weight}
      class:text-sky-500={categoryItem.cons_weight}
      on:click={() => {
        categoryItem.cons_weight = !categoryItem.cons_weight;
        updateCategoryGear();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-shirt" />
    </button>
  </td>

  <!-- worn weight -->
  <td class="w-8">
    <button
      title="Worn Weight"
      class:hide={!categoryItem.worn_weight}
      class:text-sky-500={categoryItem.worn_weight}
      on:click={() => {
        categoryItem.worn_weight = !categoryItem.worn_weight;
        updateCategoryGear();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-utensils" />
    </button>
  </td>

  <!-- weight -->
  <td class="text-center">
    <EditableDiv bind:content={item.weight_g} handleBlur={updateGear} />
  </td>

  <!-- quantity -->
  <td class="text-center">
    <input
      type="number"
      min="1"
      size="2"
      bind:value={categoryItem.quantity}
      on:change={updateCategoryGear}
      class="text-center w-12"
    />
  </td>

  <!-- delete -->
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
