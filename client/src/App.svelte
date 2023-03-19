<script lang="ts">
  import "./app.css";

  import { currentUser, pb } from "./lib/pocketbase";

  import Login from "./components/Login.svelte";
  import ListsList from "./components/ListsList.svelte";
  import GearList from "./components/GearList.svelte";
  import PackingList from "./components/PackingList.svelte";
  import CurrentList from "./components/CurrentList.svelte";
  import Logo from "./components/Logo.svelte";
  import Modal from "./components/buttons/Modal.svelte";

  let lists = [];
  let gear = [];

  async function getLists() {
    lists = await pb.collection("lists").getFullList();
  }

  async function getGear() {
    gear = await pb.collection("gear").getFullList();
  }
</script>

{#if $currentUser}
  <div class="flex">
    <aside
      class="w-1/5 h-screen bg-slate-800 text-gray-200 p-4 flex flex-col gap-2"
    >
      <Logo />

      <h2 class="text-xl font-bold">LISTS</h2>
      <ListsList {lists} {getLists} />

      <h2 class="text-xl font-bold">GEAR</h2>
      <GearList {gear} {getGear} />
      <p>
        Built by <a href="https://rileypaul.ca" class="text-sky-500"
          >Riley Paul</a
        >
      </p>
    </aside>

    <div class="flex-1">
      <header class="px-4 py-2 bg-slate-700 text-gray-100">
        <div class="flex justify-between items-center">
          <p>Signed in as {$currentUser.username}</p>
          <button
            on:click={() => pb.authStore.clear()}
            class="px-2 py-1 rounded bg-slate-200 text-gray-700"
            >Sign Out</button
          >
        </div>
      </header>
      <main class="p-4">
        <CurrentList {getLists} />
        <br />
        <PackingList {getGear} />
      </main>
    </div>
  </div>
{:else}
  <Login />
{/if}

<!-- <main class="p-2">
  {#if $currentUser}
    <p>
      Signed in as {$currentUser.username}
      <button
        on:click={() => pb.authStore.clear()}
        class="px-2 py-1 rounded bg-slate-200">Sign Out</button
      >
    </p>

    <PackingLists />
    <ItemsList />
  {:else}
    <Login />
  {/if}
</main> -->
