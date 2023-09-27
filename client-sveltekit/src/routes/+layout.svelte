<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Feather } from "lucide-svelte";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="min-h-full">
  <nav class="flex items-center justify-between p-4 border-b">
    <a href="/" class="font-medium text-xl">
      <h1 class="flex gap-2 items-center">
        <Feather class="text-teal-500" />PackLighter
      </h1>
    </a>
    
    {#if !data.user}
      <div class="flex gap-2">
        <Button href="/auth/sign-in">Login</Button>
        <Button href="/auth/sign-up" variant="secondary">Register</Button>
      </div>
    {:else}
      <form action="/auth/sign-out" method="POST">
        <Button type="submit">Logout</Button>
      </form>
    {/if}
  </nav>
</div>
<slot />
