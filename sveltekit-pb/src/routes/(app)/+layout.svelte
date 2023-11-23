<script lang="ts">
  import UserDropdown from "$components/UserDropdown.svelte";
  import { Feather } from "lucide-svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<svelte:head>
  <title>PackLighter</title>
  <meta name="description" content="Packing tool" />
</svelte:head>

<header
  class="flex items-center justify-between px-4 min-h-[4rem] border-b z-50 shadow"
>
  <a href="/" class="font-medium text-lg">
    <h1 class="flex gap-2 items-center">
      <Feather class="text-teal-500" />PackLighter
    </h1>
  </a>
  {#if data.user}
    <UserDropdown avatar={data.avatarImageUrl || ""} name={data.user.name} />
  {/if}
</header>
<main class="p-4 overflow-y-auto">
  <div class="max-w-screen-md mx-auto">
    <slot />
  </div>
</main>

<!-- <SvelteToast /> -->
