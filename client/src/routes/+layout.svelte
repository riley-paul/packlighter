<script lang="ts">
  import "../app.css"
  import Hamburger from "$lib/components/buttons/Hamburger.svelte";

  import { currentUser, pb } from "$lib/pocketbase";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;


  // import Navigation from "$lib/components/Navigation.svelte";
  // import Login from "$lib/components/Login.svelte";


</script>


hello

<!-- <Modal></Modal> -->

<!-- {#if &#x24;currentUser}
  <Drawer width="w-80" rounded="rounded-none">
    <Navigation lists="{data.lists}" items="{data.gear}"></Navigation>
  </Drawer>
  <AppShell regionpage="relative" slotpageheader="sticky top-0 z-10" slotsidebarleft="bg-surface-500/5 w-0 lg:w-80" slotpagecontent="p-4">
    <svelte:fragment slot="pageHeader">
      <AppBar padding="py-2 px-4">
        <svelte:fragment slot="lead">
          <div class="flex items-center">
            <button class="lg:hidden btn btn-sm mr-4" on:click="{drawerOpen}">
              <Hamburger></Hamburger>
            </button>
            <LightSwitch></LightSwitch>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="trail">
          <span>Signed in as <strong>{&#x24;currentUser.username}</strong></span>
          <button class="btn variant-outline" on:click="{()" => pb.authStore.clear()}&gt;Sign Out</button>
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      <Navigation lists="{data.lists}" items="{data.gear}"></Navigation>
    </svelte:fragment>

    <svelte:fragment slot="default">
      <slot></slot>
    </svelte:fragment>
  </AppShell>
{:else}
  <Login></Login>
{/if} -->
