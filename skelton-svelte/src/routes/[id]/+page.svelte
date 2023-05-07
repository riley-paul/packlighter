<script lang="ts">
  import EditableDiv from "$lib/components/EditableDiv.svelte";
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  import type { PageData } from "./$types";

  export let data: PageData;

  async function updateList() {
    try {
      await pb.collection("lists").update(data.list.id, data.list);
      invalidateAll();
      console.log("list updated");
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="grid gap-2">
  <EditableDiv
    bind:content={data.list.name}
    classes="text-3xl font-bold"
    placeholder="List Name"
    handleBlur={updateList}
  />
  <EditableDiv
    bind:content={data.list.description}
    classes=""
    placeholder="List Description"
    handleBlur={updateList}
  />
</div>
