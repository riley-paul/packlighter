<script>
  import { cubicIn } from "svelte/easing";
  import { fade } from "svelte/transition";

  export let fullWidth = false;
</script>

<div
  in:fade={{ duration: 200, easing: cubicIn }}
  class="{!fullWidth &&
    'border-muted-foreground/50 rounded border'} bg-muted/50 visible absolute inset-0"
/>
