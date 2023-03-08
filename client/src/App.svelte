<script lang="ts">
  import "./app.css";

  import { currentUser, pb } from "./lib/pocketbase";

  import Login from "./components/Login.svelte";
  import Lists from "./components/Lists.svelte";
  import Items from "./components/Items.svelte";
  import PackingList from "./components/PackingList.svelte";
  import CurrentList from "./components/CurrentList.svelte";
</script>

<main>
  {#if $currentUser}
    <div class="flex">
      <div class="w-1/5 h-screen bg-slate-800 text-gray-200 p-4 flex flex-col gap-2">
        <CurrentList/>
        <Lists />
        <Items />
      </div>

      <div>
        <div class="flex justify-between items-center p-2">
          <p>Signed in as {$currentUser.username}</p>
          <button
            on:click={() => pb.authStore.clear()}
            class="px-2 py-1 rounded bg-slate-200">Sign Out</button
          >
        </div>
        <PackingList />
      </div>
    </div>
  {:else}
    <Login />
  {/if}
</main>

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
