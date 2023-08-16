<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Plus, Share, Trash } from "lucide-svelte";
  import type { LayoutServerData, PageServerData } from "./$types";
  import AppShell from "$components/AppShell.svelte";
  import NavItem from "$components/NavItem.svelte";
  import { Separator } from "$components/ui/separator";
  import { cn } from "$lib/utils";

  export let data: LayoutServerData;
</script>

<AppShell user={data.user}>
  <svelte:fragment slot="header">
    <div class="flex items-center justify-between w-full">
      <h2>{data.list.name}</h2>
      <div class="space-x-2">
        <Button variant="outline" size="sm">
          <Share class="mr-2 w-4 h-4" />
          Share
        </Button>
        <Button variant="destructive" size="sm">
          <Trash class="mr-2 w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="sidebar">
    <ul>
      <h3 class="font-bold mb-1">Items</h3>
      <NavItem href="/gear">All Gear</NavItem>
      <Separator class="my-2" />
      <h3 class="font-bold mb-1">Packing Lists</h3>
      {#each data.lists as list (list.id)}
        <NavItem
          class={cn({ "text-muted-foreground": !list.name })}
          href={`/${list.id}`}>{list.name || "Unnamed List"}</NavItem
        >
      {/each}
      <NavItem action="?/newList">
        <Plus class="h-4 w-4 mr-2" /> New List</NavItem
      >
    </ul>
  </svelte:fragment>
  <slot />
</AppShell>
