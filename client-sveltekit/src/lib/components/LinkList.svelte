<script lang="ts">
  import { ChevronRight } from "lucide-svelte";
  import { Separator } from "./ui/separator";
  import { cn } from "$lib/utils";

  interface Link {
    name: string;
    link: string;
    class?: string;
  }

  export let links: Link[] = [];
</script>

<ul class="grid border rounded-md px-4 py-2 bg-background">
  {#each links as link, idx}
    <li>
      <a class={cn({ "opacity-50": !link.name }, link.class)} href={link.link}>
        <div class="text-sm flex w-full justify-between">
          {link.name || "Unnamed List"}
          <ChevronRight />
        </div>
      </a>
      {#if idx < links.length - 1}
        <Separator class="my-2" />
      {/if}
    </li>
  {/each}
</ul>
