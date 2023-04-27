<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import GearList from "$lib/components/GearList.svelte";
  import DragHandle from "$lib/components/buttons/DragHandle.svelte";
  import DeleteButton from "$lib/components/buttons/DeleteButton.svelte";
  import { page } from "$app/stores";

  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data);
</script>

<div class="flex">
  <aside
    class="w-1/5 sticky top-0 left-0 h-screen bg-slate-800 text-gray-200 p-4 flex flex-col gap-2"
  >
    <Logo />

    <h2 class="text-xl font-bold">LISTS</h2>

    <form method="post" action="/?/createList">
      <button class="px-4 py-1 rounded bg-slate-500 w-full">
        <i class="fa-regular fa-plus" /> Add List
      </button>
    </form>

    <ul class="bg-slate-700 px-2 overflow-y-scroll rounded divide-y">
      {#each data.lists as list (list.id)}
        <li class="flex gap-2 items-center h-12">
          <div class="hide">
            <DragHandle />
          </div>
          <a
            href={`/${list.id}`}
            class:text-orange-500={$page.url.pathname.includes(`/${list.id}`)}
            class:font-bold={$page.url.pathname.includes(`/${list.id}`)}
            class="flex-1 text-left"
          >
            {list.name || "Unnamed List"}
          </a>
          <div
            class:hidden={$page.url.pathname.includes(`/${list.id}`)}
            class="hide"
          >
            <DeleteButton
              action="/?/deleteList"
              itemId={list.id}
              name={list.name}
            />
          </div>
        </li>
      {/each}
    </ul>

    <h2 class="text-xl font-bold">GEAR</h2>
    <GearList gear={data.gear} />
    <p>
      Built by <a href="https://rileypaul.ca" class="text-sky-500">Riley Paul</a
      >
    </p>
  </aside>

  <div class="flex-1">
    <header class="px-4 py-2 bg-slate-700 text-gray-100">
      <div class="flex justify-between items-center">
        <p>Signed in as {"riley"}</p>
        <button class="px-2 py-1 rounded bg-slate-200 text-gray-700"
          >Sign Out</button
        >
      </div>
    </header>
    <main class="p-4">
      <slot />
    </main>
  </div>
</div>
