<script lang="ts">
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import { Home } from "lucide-svelte";
</script>

<LayoutApp>
  <div class="h-min w-full flex items-center justify-center">
    <div class="flex flex-col items-center my-24">
      <Home class="text-primary h-16 w-16 mb-4" />
      <h1 class="text-3xl font-bold mb-1">Home</h1>
      <p class="text-sm text-muted-foreground">Select a list to get packing</p>
    </div>
  </div>
</LayoutApp>
