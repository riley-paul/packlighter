<script lang="ts">
  import ListDropdown from "$components/ListDropdown.svelte";
  import ItemImage from "$components/ItemImage.svelte";
  import ItemRow from "$components/ItemRow.svelte";

  import {
    Copy,
    Delete,
    MoreHorizontal,
    Share,
    Plus,
    Save,
  } from "lucide-svelte";
  import type { ActionData, PageServerData } from "./$types";

  import { enhance } from "$app/forms";
  import { fly, slide } from "svelte/transition";

  import * as Select from "$lib/components/ui/select";
  import * as Table from "$lib/components/ui/table";

  import { Input } from "$components/ui/input";
  import { Button } from "$components/ui/button";
  import { Textarea } from "$components/ui/textarea";

  export let data: PageServerData;
  const { list, listItems, itemOptions } = data;

  let listName = list.name;
  let listDescription = list.description;
</script>

<div class="flex justify-between items-center gap-2 mb-4">
  <Input
    class="font-medium text-teal-500 text-xl leading-8 h-auto"
    name="name"
    bind:value={listName}
    placeholder="Unnamed List"
  />
  <ListDropdown />
</div>
<Textarea
  name="description"
  class="text-muted-foreground"
  value={listDescription}
  placeholder="Description"
  rows={3}
/>
<br />
<div class="grid divide-y">
  {#each listItems as listItem (listItem.id)}
    <ItemRow {listItem} />
  {/each}
</div>

<br />
