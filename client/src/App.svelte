<script lang="ts">
  import "./app.css";
  import Lists from "./components/Lists.svelte";
  import AllItems from "./components/AllItems.svelte";
</script>

<main>
  <Lists />
  <AllItems />
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
