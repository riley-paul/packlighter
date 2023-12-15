<script lang="ts">
  import LayoutApp from "@/layouts/LayoutApp.svelte";
  import LayoutIconTitleSubtitle from "@/layouts/LayoutIconTitleSubtitle.svelte";
  import { Home } from "lucide-svelte";
</script>

<LayoutApp>
  <LayoutIconTitleSubtitle big>
    <Home class="h-16 w-16" />
    <span slot="title">Home</span>
    <span slot="subtitle">Select a list to get packing</span>
  </LayoutIconTitleSubtitle>
</LayoutApp>
