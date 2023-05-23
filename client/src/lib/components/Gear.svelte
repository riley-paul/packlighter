<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { pb } from "$lib/pocketbase";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import EditableDiv from "./buttons/EditableDiv.svelte";
  import Counter from "./buttons/Counter.svelte";

  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";

  import type { Record } from "pocketbase";

  export let item: Record;
  export let categoryItem: Record;

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

  const modal: ModalSettings = {
    type: "prompt",
    // Data
    title: "Image URL",
    body: "Enter the URL of your image",
    // Populates the input value and attributes
    valueAttr: {
      type: "url",
      placeholder: "https://example.com",
      pattern: "https://.*",
      required: true,
    },
    // Returns the updated response value
    response: (r: string) => {
      item.image_url = r || item.image_url;
      updateGear();
    },
  };
</script>

<tr
  class="border-y border-surface-500 rounded hover:bg-primary-500/5"
  draggable="true"
  on:dragstart={(e) => {
    if (e.dataTransfer) e.dataTransfer.setData("text/plain", item.id);
    removeItem();
  }}
>
  <!-- image -->
  <td class="w-[100px]">
    {#if item.image_url}
      <div class="bg-white flex justify-center p-1">
        <a href={item.image_url}>
          <img class="h-[100px] object-contain" src={item.image_url} alt="" />
        </a>
      </div>
    {/if}
  </td>

  <!-- name -->
  <td class="w-1/6 px-2">
    <EditableDiv
      bind:content={item.name}
      handleBlur={updateGear}
      placeholder="Name"
    />
  </td>

  <!-- description -->
  <td class="text-gray-500 px-2">
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
      on:click={() => modalStore.trigger(modal)}
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

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
