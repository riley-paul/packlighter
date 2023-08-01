<script lang="ts">
  import { Button } from "$components/ui/button";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="h-full flex flex-col ">
  <nav class="flex items-center justify-between py-2 px-6 border-b">
    <a href="/app" class="font-bold text-xl">PackLighter</a>
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
  <slot />
</div>
