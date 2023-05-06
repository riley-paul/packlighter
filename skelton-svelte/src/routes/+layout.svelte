<script lang="ts">
  import Hamburger from "$lib/components/Hamburger.svelte";

  // The ordering of these imports is critical to your app working properly
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import "@skeletonlabs/skeleton/styles/all.css";
  // Most of your app wide CSS should be put in this file
  import "../app.postcss";

  import { currentUser, pb } from "$lib/pocketbase";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;

  import {
    AppShell,
    AppBar,
    Drawer,
    drawerStore,
  } from "@skeletonlabs/skeleton";
  import Navigation from "$lib/components/Navigation.svelte";
  import Login from "$lib/components/Login.svelte";

  function drawerOpen(): void {
    drawerStore.open({});
  }
</script>

{#if $currentUser}
  <Drawer width="w-56" rounded="rounded-none">
    <Navigation lists={data.lists} items={data.gear} />
  </Drawer>
  <AppShell
    regionPage="relative"
    slotPageHeader="sticky top-0 z-10"
    slotSidebarLeft="bg-surface-500/5 w-0 lg:w-56"
    slotPageContent="p-4"
  >
    <svelte:fragment slot="pageHeader">
      <AppBar>
        <svelte:fragment slot="lead">
          <div class="flex items-center">
            <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
              <Hamburger />
            </button>
            <strong class="text-xl uppercase">PackLighter</strong>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="trail">
          <strong>{$currentUser.username}</strong>
          <button
            class="btn variant-outline"
            on:click={() => pb.authStore.clear()}>Sign Out</button
          >
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      <Navigation lists={data.lists} items={data.gear} />
    </svelte:fragment>

    <svelte:fragment slot="default">
      <slot />
    </svelte:fragment>
  </AppShell>
{:else}
  <Login />
{/if}
