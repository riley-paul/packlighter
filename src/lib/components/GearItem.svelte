<script lang="ts">
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import EditableDiv from "./buttons/EditableDiv.svelte";
  import Modal from "./buttons/Modal.svelte";

  import type { Gear, CategoryGear } from "@prisma/client";

  export let gearEntry: CategoryGear & { gear: Gear };
  export let updateList: () => Promise<void> = () => Promise.resolve();

  let showImageModal = false;
</script>

<tr class="border-y hover:bg-gray-50">
  <!-- image -->
  <td class="w-[100px]">
    {#if gearEntry.gear.image_url}
      <a href={gearEntry.gear.image_url}>
        <img
          class="h-[100px] object-contain"
          src={gearEntry.gear.image_url}
          alt=""
        />
      </a>
    {/if}
  </td>

  <!-- name -->
  <td class="w-1/6">
    <EditableDiv
      bind:content={gearEntry.gear.name}
      handleBlur={updateList}
      placeholder="Name"
    />
  </td>

  <!-- description -->
  <td class="text-gray-500">
    <EditableDiv
      bind:content={gearEntry.gear.description}
      handleBlur={updateList}
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
      class:hide={!gearEntry.consumable_weight}
      class:text-sky-500={gearEntry.consumable_weight}
      on:click={() => {
        gearEntry.consumable_weight = !gearEntry.consumable_weight;
        updateList();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-shirt" />
    </button>
  </td>

  <!-- worn weight -->
  <td class="w-8">
    <button
      title="Worn Weight"
      class:hide={!gearEntry.worn_weight}
      class:text-sky-500={gearEntry.worn_weight}
      on:click={() => {
        gearEntry.worn_weight = !gearEntry.worn_weight;
        updateList();
      }}
    >
      <i class="hover:text-gray-500 transition-colors fa-solid fa-utensils" />
    </button>
  </td>

  <!-- weight -->
  <td class="text-center">
    <input
      type="number"
      bind:value={gearEntry.gear.weight_g}
      on:change={updateList}
      class="text-center w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  </td>

  <!-- quantity -->
  <td class="text-center">
    <input
      type="number"
      min="1"
      size="2"
      bind:value={gearEntry.quantity}
      on:change={updateList}
      class="text-center w-12"
    />
  </td>

  <!-- delete -->
  <td class="text-center">
    <div class="hide">
      <DeleteButton askConfirm={false} />
    </div>
  </td>
</tr>

<Modal bind:show={showImageModal}>
  <h1 class="font-bold text-lg pb-2">Add Image URL</h1>
  <input
    class="rounded px-2 py-1 text-gray-800"
    type="text"
    placeholder="Image URL"
    bind:value={gearEntry.gear.image_url}
  />
  <button
    class="bg-slate-500 rounded px-2 py-1 ml-2"
    on:click={() => {
      updateList();
      showImageModal = false;
    }}
  >
    Save
  </button>
  <button
    class="bg-slate-500 rounded px-2 py-1 ml-1"
    on:click={() => (gearEntry.gear.image_url = "")}
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
