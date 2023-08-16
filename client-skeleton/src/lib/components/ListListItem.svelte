<script lang="ts">
  import { pb, currentUser } from "$lib/pocketbase";
  import { page } from "$app/stores";

  $: isActive = () => `/${list.id}` === $page.url.pathname;

  import type { Record } from "pocketbase";
  import { invalidateAll } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";
  import DeleteButton from "./buttons/DeleteButton.svelte";

  export let list: Record;

  async function deleteList() {
    try {
      await pb.collection("lists").delete(list.id);
      invalidateAll();
    } catch (err) {
      alert("Could not delete list");
      console.log("Could not delete list");
      console.error(err);
    }
  }
</script>

<li>
  <a
    class={[
      isActive() ? "!bg-primary-500" : "",
      list.name ? "" : "text-gray-500",
      "flex h-10",
    ].join(" ")}
    href={`/${list.id}`}
    data-sveltekit-preload-data
  >
    <span class="flex-1">{list.name || "Unnamed List"}</span>
    <div class:hidden={isActive()} class="hide">
      <DeleteButton onClick={deleteList} />
    </div>
  </a>
</li>
