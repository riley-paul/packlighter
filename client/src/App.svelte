<script lang="ts">
  import "./app.css";

  import { currentUser, pb } from "./lib/pocketbase";

  import Login from "./components/Login.svelte";
  import ListsList from "./components/ListsList.svelte";
  import GearList from "./components/GearList.svelte";
  import PackingList from "./components/PackingList.svelte";
  import CurrentList from "./components/CurrentList.svelte";
</script>

{#if $currentUser}
  <div class="flex">
    <aside
      class="w-1/5 h-screen bg-slate-800 text-gray-200 p-4 flex flex-col gap-2"
    >
      <section>
        <div class="flex gap-2 items-center">
          <div class="h-8"><img class="h-full" src="/favicon.png" alt="" /></div>
          <h1 class="text-4xl font-bold">PackLighter</h1>
        </div>
        <p>
          Inspired by <a class="text-sky-500" href="https://lighterpack.com/"
            >LighterPack.com</a
          >
        </p>
      </section>

      <h2 class="text-xl font-bold">LISTS</h2>
      <ListsList />

      <h2 class="text-xl font-bold">GEAR</h2>
      <GearList />
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
        <CurrentList />
        <br />
        <PackingList />
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
