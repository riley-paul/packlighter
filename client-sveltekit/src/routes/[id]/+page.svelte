<script lang="ts">
  import { Button } from "$components/ui/button";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Copy, Delete, MoreHorizontal, Share } from "lucide-svelte";

  const { list } = data;
</script>

<div class="flex justify-between items-center">
  <h2 class="font-medium text-teal-500 text-xl leading-8">{list.name}</h2>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button size="icon" variant="ghost"><MoreHorizontal /></Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <form action="" method="post" class="grid">
          <Button
            class="justify-start"
            formaction="?/share"
            disabled
            variant="ghost"
          >
            <Share class="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            class="justify-start"
            formaction="?/duplicate"
            variant="ghost"
          >
            <Copy class="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button class="justify-start" formaction="?/delete" variant="ghost">
            <Delete class="h-4 w-4 mr-2" />Delete
          </Button>
        </form>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
<p class="text-muted-foreground">{list.description}</p>
<br />
<h3 class="font-medium text-lg">Gear</h3>

<br />
