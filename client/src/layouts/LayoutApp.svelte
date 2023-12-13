<script lang="ts">
  import AccountEditor from "@/components/AccountEditor.svelte";
  import ItemList from "@/components/ItemList.svelte";
  import ListList from "@/components/ListList.svelte";
  import ModeToggle from "@/components/ModeToggle.svelte";
  import { Feather } from "lucide-svelte";
  import { link } from "svelte-spa-router";

  let isSidebarOpen = true;
</script>

<div class="flex h-screen flex-col overflow-hidden">
  <header class="bg-card z-50 flex h-14 w-full items-center border-b shadow">
    <div class="container flex justify-between">
      <div class="flex items-center gap-4">
        <a href="/" use:link class="flex items-center">
          <Feather class="text-primary mr-2 w-6" />
          <h1 class="text-lg font-medium">PackLighter</h1>
        </a>
      </div>
      <div class="flex items-center gap-4">
        <AccountEditor />
        <ModeToggle />
      </div>
    </div>
  </header>
  <main class="flex-1 overflow-hidden">
    <div class="container grid grid-cols-[1fr_300px] overflow-hidden">
      <div class="overflow-auto py-6 pr-4">
        <slot />
      </div>
      <aside class="flex flex-col overflow-hidden border-l-2 py-6 pl-4">
        <ListList />
        <ItemList />
      </aside>
    </div>
  </main>
</div>

<style>
  main {
    scrollbar-gutter: stable;
  }
</style>
