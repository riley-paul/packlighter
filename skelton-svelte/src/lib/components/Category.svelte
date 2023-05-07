<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { pb, currentUser } from "$lib/pocketbase";
  import CreateButton from "./buttons/CreateButton.svelte";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import EditableDiv from "./buttons/EditableDiv.svelte";

  import type { Record } from "pocketbase";

  export let category: Record;

  async function updateCategory() {
    try {
      const { name } = category;
      await pb.collection("list_categories").update(category.id, { name });
      console.log("Category updated");
    } catch (err) {
      alert("Could not update category");
      console.log("Could not update category");
      console.error(err);
    }
  }

  async function createItem() {
    if (!$currentUser) return;
    try {
      const newItem = await pb
        .collection("gear")
        .create({ user: $currentUser.id });
      await pb
        .collection("categories_gear")
        .create({ category: category.id, gear: newItem.id, quantity: 1 });
      invalidateAll();
      console.log("Item created");
    } catch (err) {
      alert("Could not create new item");
      console.log("Could not create new item");
      console.error(err);
    }
  }

  async function addItem(itemID: string, categoryID: string) {
    try {
      await pb
        .collection("categories_gear")
        .create({ category: categoryID, gear: itemID, quantity: 1 });
      invalidateAll();
      console.log("Item added to category");
    } catch (err) {
      alert("Could not add item");
      console.log("Could not add item");
      console.error(err);
    }
  }

  function handleDrop(e: DragEvent) {
    if (!e.dataTransfer) return;
    const itemID = e.dataTransfer.getData("text/plain");
    addItem(itemID, category.id);
  }

  async function deleteCategory() {
    try {
      await pb.collection("list_categories").delete(category.id);
      invalidateAll();
      console.log("category deleted");
    } catch (err) {
      alert("Could not remove category");
      console.log("Could not remove category");
      console.error(err);
    }
  }
</script>

<table class="table-fixed border-b-2" on:drop|preventDefault={handleDrop}>
  <thead class="border-b-2">
    <tr>
      <th colspan="6" class="text-left text-lg">
        <EditableDiv
          bind:content={category.name}
          handleBlur={updateCategory}
          placeholder="Category Name"
        />
      </th>
      <th class="w-1/12">Weight</th>
      <th class="w-1/12">Qty</th>
      <th class="w-10">
        <div class="hide">
          <DeleteButton onClick={deleteCategory} name={category.name} />
        </div>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y">
    <slot />
  </tbody>
</table>
<CreateButton entity="item" onClick={createItem} />

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
