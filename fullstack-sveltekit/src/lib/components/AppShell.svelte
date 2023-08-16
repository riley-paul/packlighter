<script lang="ts">
  import type { UserSchema } from "lucia-auth";

  export let user: UserSchema;

  import { APP_NAME } from "$lib/config/constants";
  import {
    PanelLeftClose,
    UserCircle2,
    LogOut,
    PanelLeftOpen,
  } from "lucide-svelte";
  import { Button } from "$components/ui/button";
  import { Separator } from "$components/ui/separator";
  import NavItem from "$components/NavItem.svelte";

  let sidebarOpen = true;
</script>

<div class="w-full h-full flex overflow-hidden">
  {#if sidebarOpen}
    <aside class="min-w-[250px] max-w-[450px] w-auto flex flex-col border-r">
      <header
        id="sidebarHeader"
        class="border-b h-14 flex items-center px-4 justify-between"
      >
        <h1 class="text-lg font-bold leading-none">
          {APP_NAME}
        </h1>
        <Button
          on:click={() => (sidebarOpen = false)}
          variant="ghost"
          class="w-10 rounded-full p-0"
        >
          <PanelLeftClose class="h-5 w-5" />
        </Button>
      </header>

      <div id="sidebarContent" class="flex-1 flex flex-col p-4">
        <slot name="sidebar" />

        <footer id="sidebarFooter" class="mt-auto flex-shrink-0">
          {#if user}
            <Separator class="my-2" />
            <div class="font-bold">
              {user.firstName}
              {user.lastName}
            </div>
            <div class="text-sm text-muted-foreground">
              {user.email}
            </div>
            <ul class="mt-1">
              <NavItem href="/profile">
                <UserCircle2 class="h-4 w-4 mr-2" /> Account
              </NavItem>
              <NavItem action="/auth/sign-out">
                <LogOut class="h-4 w-4 mr-2" />Sign Out
              </NavItem>
            </ul>
          {/if}
        </footer>
      </div>
    </aside>
  {/if}

  <main class="flex-1">
    <header class="sticky top-0 z-50 h-14 border-b flex items-center px-4">
      {#if !sidebarOpen}
        <Button
          on:click={() => (sidebarOpen = true)}
          variant="ghost"
          class="w-10 rounded-full p-0 mr-2"
        >
          <PanelLeftOpen class="h-5 w-5" />
        </Button>
      {/if}
      <slot name="header" />
    </header>
    <slot />
  </main>
</div>
