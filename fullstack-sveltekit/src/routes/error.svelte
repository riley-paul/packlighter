<script lang="ts">
  import { page } from "$app/stores";
  import { Button } from "$components/ui/button";
</script>

<div class="prose">
  {#if $page.status === 404}
    <h2>Page Not Found</h2>
		<Button href="/app" variant="link">Go Home</Button>
  {:else}
    <h2>Unexpected Error</h2>
    <p>We're investigating the issue.</p>
  {/if}

  {#if $page.error?.errorId}
    <p>Error ID: {$page.error.errorId}</p>
  {/if}
</div>
