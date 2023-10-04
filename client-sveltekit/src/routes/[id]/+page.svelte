<script lang="ts">
  import ListDropdown from "$components/ListDropdown.svelte";

  import { Copy, Delete, MoreHorizontal, Share, Plus } from "lucide-svelte";
  import type { ActionData, PageServerData } from "./$types";

  import { enhance } from "$app/forms";
  import { fly, slide } from "svelte/transition";

  import * as Select from "$lib/components/ui/select";
  import * as Table from "$lib/components/ui/table";

  import { Button } from "$components/ui/button";
  import { Input } from "$components/ui/input";
  import Combobox from "$components/Combobox.svelte";
  import ItemImage from "$components/ItemImage.svelte";
  import ItemRow from "$components/ItemRow.svelte";

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
<div class="grid divide-y">
  {#each listItems as listItem (listItem.id)}
    <ItemRow {listItem} />
  {/each}
</div>

{#if form?.error}
  <p>{form.error}</p>
{/if}

<br />

<Combobox
  placeholder="Add some gear..."
  options={itemOptions.map((i) => i.name)}
/>
