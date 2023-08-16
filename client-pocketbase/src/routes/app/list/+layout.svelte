<script lang="ts">
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
  } from "$components/ui/card";
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;

  import { page } from "$app/stores";
  $: currentPage = $page.url.pathname;
</script>

<div class="flex h-full">
  <div class="bg-card border-r w-1/4 overflow-y-auto">
    <CardHeader>
      <CardTitle>Lists</CardTitle>
    </CardHeader>
    <CardContent>
      {#each data.lists as list}
        <Button
          class="block w-full {list.name ? '' : 'text-muted-foreground'}"
          variant={currentPage === `/app/list/${list.id}`
            ? "secondary"
            : "ghost"}
          href={`/app/list/${list.id}`}
        >
          {list.name || "Unnamed List"}
        </Button>
      {/each}
    </CardContent>
    <CardFooter>
      <form action="" method="POST" class="w-full">
        <Button type="submit" class="w-full">New List</Button>
      </form>
    </CardFooter>
    <CardHeader>
      <CardTitle>Items</CardTitle>
    </CardHeader>
    <CardContent>
      {#each data.items as item}
        <Button
          class="block w-full {item.name ? '' : 'text-muted-foreground'}"
          variant={currentPage === `/app/item/${item.id}`
            ? "secondary"
            : "ghost"}
          href={`/app/item/${item.id}`}
        >
          {item.name || "Unnamed List"}
        </Button>
      {/each}
    </CardContent>
  </div>

  <slot />
</div>
