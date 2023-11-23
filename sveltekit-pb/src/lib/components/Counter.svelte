<script lang="ts">
  import { Minus, Plus } from "lucide-svelte";
  import { Button } from "./ui/button";

  export let value = 0;
</script>

<div class="flex rounded-sm border divide-y divide-x">
  <div class="text-xs flex justify-center items-center w-6">{value}</div>
  <div class="flex flex-col divide-y">
    <Button
      variant="ghost"
      class="h-5 w-5 p-0.5 rounded-none"
      on:click={() => (value += 1)}><Plus class="h-3 w-3" /></Button
    >
    <Button
      variant="ghost"
      class="h-5 w-5 p-0.5 rounded-none"
      on:click={() => (value -= 1)}><Minus class="h-3 w-3" /></Button
    >
  </div>
</div>
