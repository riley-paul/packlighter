<script>
  import "./app.css";
  import { onMount } from "svelte";

  import Login from "./lib/Login.svelte";
  import PackingLists from "./lib/PackingLists.svelte";
  import ItemsList from "./lib/ItemsList.svelte";

  import { currentUser, pb } from "./lib/pocketbase";
</script>

<main class="p-2">
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
</main>
