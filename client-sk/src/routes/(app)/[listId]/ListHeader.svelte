<script lang="ts">
  import { Input } from "../../../components/ui/input";
  import { Textarea } from "../../../components/ui/textarea";
  import { useUpdateList, type ListWithCategories } from "@/hooks/useList";
  import ListSettings from "./ListSettings.svelte";

  export let list: ListWithCategories;

  $: updateList = useUpdateList();
  $: saveList = () => $updateList.mutate({ id: list.id, list });
</script>

<div class="flex gap-2">
  <form on:submit={saveList} class="flex-1 space-y-2">
    <Input
      bind:value={list.name}
      on:blur={saveList}
      class="text-primary h-auto text-3xl font-bold placeholder:italic"
      placeholder="List Name"
    />
    <Textarea
      bind:value={list.description}
      on:blur={saveList}
      class="placeholder:italic"
      placeholder="Description"
    />
    <input type="hidden" />
  </form>
  <div class="flex gap-2">
    <ListSettings {list} />
  </div>
</div>
