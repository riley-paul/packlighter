<script>
  import { X } from "lucide-svelte";
  import { Button } from "./ui/button";

  export let handleDelete = () => {};
</script>

<Button
  size="icon"
  variant="ghost"
  class="text-muted-foreground hover:text-foreground h-6 w-6 rounded-full"
  on:click={handleDelete}
>
  <X class="h-4 w-4" />
</Button>
