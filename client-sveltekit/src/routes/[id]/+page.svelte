<script lang="ts">
  import ListDropdown from "$components/ListDropdown.svelte";

  import { Copy, Delete, MoreHorizontal, Share, Plus } from "lucide-svelte";
  import type { ActionData, PageServerData } from "./$types";

  import { enhance } from "$app/forms";
  import { fly, slide } from "svelte/transition";

  import * as Select from "$lib/components/ui/select";

  import { Button } from "$components/ui/button";
  import { Input } from "$components/ui/input";

  export let form: ActionData;
  export let data: PageServerData;
  const { list, listItems, itemOptions } = data;
</script>

<div class="flex justify-between items-center">
  <h2 class="font-medium text-teal-500 text-xl leading-8">{list.name}</h2>
  <ListDropdown />
</div>
<p class="text-muted-foreground">{list.description}</p>
<br />
<h3 class="font-medium text-lg">Gear</h3>
<ul>
  {#each listItems as listItem (listItem.id)}
    {#if listItem.expand && "item" in listItem.expand}
      <li in:fly={{ y: 20 }} out:slide>
        <form
          method="post"
          action="?/removeItem"
          class="flex items-center justify-between"
          use:enhance
        >
          <input type="hidden" name="id" value={listItem.id} />
          <span>{listItem.expand.item.name}</span>
          <Button size="icon" variant="ghost">
            <Delete class="h-4 w-4" />
          </Button>
        </form>
      </li>
    {/if}
  {/each}
</ul>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<form action="?/addItem" method="post" class="flex gap-2">
  <select name="item">
    {#each itemOptions as item (item.id)}
      <option value={item.id}>{item.name}</option>
    {/each}
  </select>
  <Button><Plus class="h-4 w-4 mr-2" />Add</Button>
</form>
