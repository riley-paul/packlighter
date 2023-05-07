<script lang="ts">
  import { pb, currentUser } from "$lib/pocketbase";
  import { page } from "$app/stores";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

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
      classesActive(`/${list.id}`),
      list.name ? "" : "text-gray-500",
      "flex",
    ].join(" ")}
    href={`/${list.id}`}
    data-sveltekit-preload-data
  >
    <span class="flex-1">{list.name || "Unnamed List"}</span>
    <DeleteButton onClick={deleteList} />
  </a>
</li>
