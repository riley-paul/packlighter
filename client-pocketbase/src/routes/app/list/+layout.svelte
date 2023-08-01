<script lang="ts">
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "$components/ui/card";
  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;

  import { page } from "$app/stores";
  $: currentPage = $page.url.pathname;
</script>

<div class="flex h-full">
  <div class="bg-card border-r">
    <CardHeader>
      <CardTitle>Lists</CardTitle>
      <CardDescription>
        <Button class="w-full">New List</Button>
      </CardDescription>
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
  </div>

  <slot />
</div>
