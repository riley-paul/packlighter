<script lang="ts">
  import { Separator } from "$components/ui/separator";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  const { items } = data;
</script>

<h2 class="text-lg font-medium mb-2">Gear</h2>

<ul class="grid border rounded-md px-4 bg-background">
  {#each items as item, idx}
    <li class="py-2 text-sm">
      <img src={item.image_url} alt="item" />
      <div>
        <div class="flex w-full justify-between items-center">
          <span>{item.name}</span>
          <span>{item.weight_g}g</span>
        </div>
        <p class="text-muted-foreground">{item.description}</p>
      </div>
    </li>
    {#if idx < items.length - 1}
      <Separator />
    {/if}
  {/each}
</ul>
