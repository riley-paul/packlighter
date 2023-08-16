<script lang="ts">
  export let href: string = "";
  export let action: string = "";
  export { className as class };

  let className: string | undefined | null = "";

  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { cn } from "$lib/utils";

  $: selected = href === $page.url.pathname;
</script>

<li
  class={cn(
    className,
    "text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-2",
    { "text-accent-foreground bg-accent": selected }
  )}
>
  {#if href}
    <a {href} data-sveltekit-preload-data class="flex items-center"><slot /> </a>
  {:else}
    <form use:enhance {action} method="post">
      <button type="submit" class="flex items-center">
        <slot />
      </button>
    </form>
  {/if}
</li>
