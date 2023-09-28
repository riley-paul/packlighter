<script lang="ts">
  import UserDropdown from "../lib/components/UserDropdown.svelte";
  import { Feather } from "lucide-svelte";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<svelte:head>
  <title>PackLighter</title>
  <meta name="description" content="Packing tool" />
</svelte:head>

<header class="flex items-center justify-between px-4 h-16 border-b">
  <a href="/" class="font-medium text-lg">
    <h1 class="flex gap-2 items-center">
      <Feather class="text-teal-500" />PackLighter
    </h1>
  </a>
  {#if data.user}
    <UserDropdown avatar={data.avatarImageUrl || ""} />
  {/if}
</header>
<main class="p-4 overflow-y-auto">
  <slot />
</main>

<!-- <SvelteToast /> -->
