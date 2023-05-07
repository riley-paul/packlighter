<script lang="ts">
  import GearListItem from "./GearListItem.svelte";

  import { page } from "$app/stores";

  $: classesActive = (href: string) =>
    href === $page.url.pathname ? "!bg-primary-500" : "";

  import type { Record } from "pocketbase";

  export let lists: Record[];
  export let items: Record[];
</script>

<div class="h-screen flex flex-col p-3">
  <section class="py-2">
    <div class="text-3xl font-bold">🎒PackLighter</div>
    <small>
      Inspired by <a href="https://lighterpack.com/">LighterPack.com</a>
    </small>
  </section>
  <hr />
  <span class="title">Lists</span>
  <div class="container">
    <nav class="list-nav">
      <ul>
        {#each lists as list}
          <li>
            <a
              class={classesActive(`/${list.id}`)}
              href={`/${list.id}`}
              data-sveltekit-preload-data
            >
              <span>{list.name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  <span class="title">Gear</span>
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
    @apply overflow-y-scroll bg-surface-backdrop-token w-full pb-2 outline rounded outline-surface-500 p-2;
  }

  .title {
    @apply font-bold text-lg uppercase py-2 text-primary-500;
  }
</style>
