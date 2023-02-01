<script>
  import "./app.css";
  import { onMount } from "svelte";

  import Login from "./lib/Login.svelte";

  import { currentUser, pb } from "./lib/pocketbase";

  let lists = [];
  onMount(async () => {
    const result = await pb.collection("items").getFullList();
    console.log("lists", result);
  });
</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username}
    <button
      on:click={() => pb.authStore.clear()}
      class="px-2 py-1 rounded bg-slate-200">Sign Out</button
    >
  </p>
{:else}
  <Login />
{/if}

hello
