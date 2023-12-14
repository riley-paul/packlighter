<script>
  import { Check, X } from "lucide-svelte";
  import { Button } from "./ui/button";
  import { onDestroy, onMount } from "svelte";

  export let handleDelete = () => {};
  export let noConfirm = false;

  let isConfirming = false;

  const cancelDelete = () => {
    isConfirming = false;
  };

  onMount(() => {
    window.addEventListener("click", cancelDelete);
  });
  onDestroy(() => {
    window.removeEventListener("click", cancelDelete);
  });
</script>

<Button
  size="icon"
  variant={isConfirming ? "destructive" : "ghostMuted"}
  class="h-6 w-6 rounded-full"
  on:click={(ev) => {
    ev.stopPropagation();
    if (noConfirm) {
      handleDelete();
      return;
    }

    if (isConfirming) {
      handleDelete();
      isConfirming = false;
      return;
    }

    isConfirming = true;
  }}
>
  {#if isConfirming}
    <Check class="h-4 w-4" />
  {:else}
    <X class="h-4 w-4" />
  {/if}
</Button>
