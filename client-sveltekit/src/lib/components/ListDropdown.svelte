<script lang="ts">
  import { Copy, Delete, MoreHorizontal, Share, Plus } from "lucide-svelte";
  import type { PageServerData } from "../../routes/[id]/$types";
  import * as DropdownMenu from "$components/ui/dropdown-menu";

  import { Button } from "$components/ui/button";
</script>

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
        <Button class="justify-start" formaction="?/duplicate" variant="ghost">
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
