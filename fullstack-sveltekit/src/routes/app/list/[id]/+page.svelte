<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Share, Trash } from "lucide-svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

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

{data.list.name}
