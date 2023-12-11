<script lang="ts">
  import AccountEditor from "@/components/AccountEditor.svelte";
  import ItemList from "@/components/ItemList.svelte";
  import ListList from "@/components/ListList.svelte";
  import ModeToggle from "@/components/ModeToggle.svelte";
  import { buttonVariants } from "@/components/ui/button";
  import Toggle from "@/components/ui/toggle/toggle.svelte";
  import { cn } from "@/lib/utils";
  import { Feather, MoreVertical } from "lucide-svelte";
  import { link } from "svelte-spa-router";

  let isSidebarOpen = false;
</script>

<div class="flex h-screen overflow-hidden">
  <aside
    class={cn(
      "w-0 border-r shadow-inner transition-all",
      isSidebarOpen && "w-[250px]",
      "flex h-full flex-col overflow-hidden",
    )}
  >
    <ItemList />
  </aside>
  <div class="flex flex-1 flex-col overflow-hidden">
    <header class="z-50 flex h-14 w-full items-center border-b bg-card shadow">
      <div class="container flex justify-between">
        <div class="flex items-center gap-4">
          <Toggle
            aria-label="Toggle sidebar"
            aria-checked={isSidebarOpen}
            on:click={() => (isSidebarOpen = !isSidebarOpen)}
            class={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "p-0",
            )}
          >
            <MoreVertical class="h-4 w-4" />
          </Toggle>
          <a href="/" use:link class="flex items-center">
            <Feather class="mr-2 w-6 text-primary" />
            <h1 class="text-lg font-medium">PackLighter</h1>
          </a>
        </div>
        <div class="flex items-center gap-4">
          <AccountEditor />
          <ModeToggle />
        </div>
      </div>
    </header>
    <main class="flex-1 overflow-auto py-6">
      <div class="container grid grid-cols-[1fr_250px] gap-4">
        <slot />
        <aside class="h-fit">
          <ListList />
        </aside>
      </div>
    </main>
  </div>
</div>

<style>
  main {
    scrollbar-gutter: stable;
  }
</style>
