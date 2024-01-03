<script lang="ts">
  import { ChevronDown, ChevronUp } from "lucide-svelte";
  import { Button } from "../ui/button";
  export let value: number;
  export let handleChange: () => void = () => {};

  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
</script>

<div class="flex flex-col items-center justify-center">
  <Button
    size="sm"
    variant="outline"
    class="h-auto w-4 rounded-none rounded-t-sm p-0"
    on:click={() => {
      if (max !== undefined && value >= max) return;
      value += 1;
      handleChange();
    }}><ChevronUp class="h-3 w-3" /></Button
  >
  <Button
    size="sm"
    variant="outline"
    class="h-auto w-4 rounded-none rounded-b-sm p-0"
    on:click={() => {
      if (min !== undefined && value <= min) return;
      value -= 1;
      handleChange();
    }}><ChevronDown class="h-3 w-3" /></Button
  >
</div>
