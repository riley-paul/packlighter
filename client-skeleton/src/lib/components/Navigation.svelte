<script lang="ts">
  import ListListItem from "./ListListItem.svelte";

  import GearListItem from "./GearListItem.svelte";

  import { pb, currentUser } from "$lib/pocketbase";
  import { page } from "$app/stores";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

  import type { Record } from "pocketbase";
  import { goto, invalidateAll } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";

  export let lists: Record[];
  export let items: Record[];

  async function createList() {
    if (!$currentUser) return;
    try {
      const newList = await pb
        .collection("lists")
        .create({ user: $currentUser.id });
      await invalidateAll();
      goto(`/${newList.id}`);
    } catch (err) {
      alert("Could not create a new list");
      console.log("could not create a new list");
      console.error(err);
    }
  }
</script>

<div class="h-screen flex flex-col gap-2 p-3">
  <section>
    <div class="text-3xl font-bold">🎒PackLighter</div>
    <small>
      Inspired by <a href="https://lighterpack.com/">LighterPack.com</a>
    </small>
  </section>
  <hr />
  <span class="title">Lists</span>

  <button class="btn btn-sm w-full variant-outline" on:click={createList}>
    + New Packing List
  </button>

  <div class="container">
    <nav class="list-nav">
      <ul>
        {#each lists as list}
          <ListListItem {list} />
        {/each}
      </ul>
    </nav>
  </div>
  <span class="title">Gear</span>
  <input type="search" class="input text-sm" placeholder="Search" />
  <div class="container">
    <dl class="list-dl">
      {#each items as item}
        <GearListItem {item} />
      {/each}
    </dl>
  </div>
</div>

<style>
  .container {
    @apply overflow-y-scroll bg-surface-backdrop-token w-full border rounded border-surface-500 p-2;
  }

  .title {
    @apply font-bold text-lg uppercase text-primary-500;
  }
</style>
