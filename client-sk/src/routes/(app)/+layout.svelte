<script lang="ts">
  import AccountEditor from "@/components/AccountEditor.svelte";
  import ItemList from "@/components/ItemList.svelte";
  import ListList from "@/components/ListList.svelte";
  import ModeToggle from "@/components/base/ModeToggle.svelte";
  import { Feather } from "lucide-svelte";

  export let pageTitle = "";
</script>

<div class="flex h-screen flex-col overflow-hidden">
  <header class="bg-card z-50 flex h-14 w-full items-center border-b shadow">
    <div class="container flex justify-between">
      <div class="flex items-center gap-2 text-lg">
        <a href="/" class="flex items-center">
          <Feather class="text-primary mr-2 w-6" />
          <h1 class="font-medium">PackLighter</h1>
        </a>
        {#if pageTitle}
          <span class="text-muted-foreground flex gap-2">
            <div>•</div>
            <div>{pageTitle}</div>
          </span>
        {/if}
      </div>
      <div class="flex items-center gap-4">
        <AccountEditor />
        <ModeToggle />
      </div>
    </div>
  </header>
  <main
    class="container grid h-full flex-1 grid-cols-[1fr_300px] overflow-hidden"
  >
    <div class="scroll-gutter flex-1 overflow-auto py-6 pr-4">
      <slot />
    </div>
    <aside class="flex w-[300px] flex-col overflow-auto border-l py-4 pl-4">
      <ListList />
      <br />
      <ItemList />
    </aside>
  </main>
</div>
