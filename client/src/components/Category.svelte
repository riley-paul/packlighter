<script lang="ts">
  import { pb } from "./../lib/pocketbase";
  import CreateButton from "./CreateButton.svelte";
  import DeleteButton from "./DeleteButton.svelte";
  import EditableDiv from "./EditableDiv.svelte";

  export let category;
  export let handleRemove = () => undefined;
  export let handleCreate = () => undefined;
  export let handleDrop = (e: DragEvent) => undefined;

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
</script>

<table class="table-fixed border-b-2" on:drop|preventDefault={handleDrop}>
  <thead class="text-lg border-b-2">
    <tr>
      <th colspan="6" class="text-left">
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
          <DeleteButton onClick={handleRemove} />
        </div>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y">
    <slot />
  </tbody>
</table>
<CreateButton entity="item" onClick={handleCreate} />

<style>
  .hide {
    visibility: hidden;
  }

  *:hover > * > .hide {
    visibility: visible;
  }
</style>
