<script lang="ts">
  import GearListItem from "./GearListItem.svelte";

  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { invalidateAll } from "$app/navigation";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

  import type { Record } from "pocketbase";
  import DeleteButton from "./DeleteButton.svelte";
  import DragHandle from "./DragHandle.svelte";

  export let lists: Record[];
  export let items: Record[];

  async function deleteGear(id: string) {
    try {
      await pb.collection("lists").delete(id);
      invalidateAll();
      console.log("list updated");
    } catch (err) {
      alert("Could not delete gear");
      console.log("Could not delete gear");
      console.error(err);
    }
  }
</script>

<div class="h-screen flex flex-col">
  <section class="px-4 py-2">
    <div class="text-2xl font-bold">🎒PackLighter</div>
    <small>
      Inspired by <a href="https://lighterpack.com/">LighterPack.com</a>
    </small>
  </section>
  <hr />
  <span class="title">Lists</span>
  <div class="">
    <nav class="list-nav p-4">
      <ul>
        {#each lists as list}
          <li>
            <a
              class={classesActive(`/${list.id}`)}
              href={`/${list.id}`}
              data-sveltekit-preload-data>{list.name}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  <span class="title">Gear</span>
  <div class="">
    <dl class="list-dl">
      {#each items as item}
        <GearListItem {item} />
      {/each}
    </dl>
  </div>
</div>

<style>
  .container {
    @apply overflow-y-scroll bg-surface-backdrop-token w-full;
  }

  .title {
    @apply font-bold uppercase px-4 my-2;
  }
</style>
