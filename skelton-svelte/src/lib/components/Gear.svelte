<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { pb } from "$lib/pocketbase";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import EditableDiv from "./buttons/EditableDiv.svelte";
  import Modal from "./buttons/Modal.svelte";
  import Counter from "./buttons/Counter.svelte";

  import type { Record } from "pocketbase";

  export let item: Record;
  export let categoryItem: Record;

  let showImageModal = false;

  async function updateGear() {
    try {
      await pb.collection("gear").update(item.id, { ...item });
      invalidateAll();
      console.log("Gear updated");
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
      invalidateAll();
      console.log("Gear category relation updated");
    } catch (err) {
      alert("Could not update category gear relation");
      console.log("Could not update category gear relation");
      console.error(err);
    }
  }

  async function removeItem() {
    try {
      await pb.collection("categories_gear").delete(categoryItem.id);
      if (!item.name && !item.description) {
        await pb.collection("gear").delete(item.id);
      }
      invalidateAll();
      console.log("gear removed from list");
    } catch (err) {
      alert("Could not remove item from category");
      console.log("Could not remove item from category");
      console.error(err);
    }
  }
</script>

<tr class="border-y">
  <!-- image -->
  <td class="w-[100px]">
    {#if item.image_url}
      <a href={item.image_url}>
        <img class="h-[100px] object-contain" src={item.image_url} alt="" />
      </a>
    {/if}
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
    <button
      title="Add Image"
      class="hide"
      on:click={() => (showImageModal = true)}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-camera" />
    </button>
  </td>

  <!-- consumable weight -->
  <td class="w-8">
    <button
      title="Consumable Weight"
      class:hide={!categoryItem.cons_weight}
      class:text-secondary-500={categoryItem.cons_weight}
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
      class:text-secondary-500={categoryItem.worn_weight}
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
    <Counter bind:value={categoryItem.quantity} onChange={updateCategoryGear} />
  </td>

  <!-- delete -->
  <td class="text-center">
    <div class="hide">
      <DeleteButton onClick={removeItem} askConfirm={false} />
    </div>
  </td>
</tr>

<Modal bind:show={showImageModal}>
  <h1 class="font-bold text-lg pb-2">Add Image URL</h1>
  <input
    class="rounded px-2 py-1 text-gray-800"
    type="text"
    placeholder="Image URL"
    bind:value={item.image_url}
  />
  <button
    class="bg-slate-500 rounded px-2 py-1 ml-2"
    on:click={() => {
      updateGear();
      showImageModal = false;
    }}
  >
    Save
  </button>
  <button
    class="bg-slate-500 rounded px-2 py-1 ml-1"
    on:click={() => (item.image_url = null)}
  >
    Clear
  </button>
</Modal>

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
