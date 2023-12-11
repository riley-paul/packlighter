<script lang="ts">
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Home } from "lucide-svelte";
</script>

<LayoutApp>
  <div class="flex h-min w-full items-center justify-center">
    <div class="my-24 flex flex-col items-center">
      <Home class="mb-4 h-16 w-16 text-primary" />
      <h1 class="mb-1 text-3xl font-bold">Home</h1>
      <p class="text-sm text-muted-foreground">Select a list to get packing</p>
    </div>
  </div>
</LayoutApp>
