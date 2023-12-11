<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import { Input } from "./ui/input";
  import { Textarea } from "./ui/textarea";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { useUpdateList } from "@/hooks/useList";
  import ListSettings from "./ListSettings.svelte";

  const queryClient = useQueryClient();

  export let list: RecordModel;

  $: updateList = useUpdateList(queryClient);
  $: saveList = () => $updateList.mutate(list);
</script>

<div class="flex gap-2">
  <form on:submit={saveList} class="flex-1 space-y-2">
    <Input
      bind:value={list.name}
      on:blur={saveList}
      class="h-auto text-3xl font-bold text-primary"
      placeholder="List Name"
    />
    <Textarea
      bind:value={list.description}
      on:blur={saveList}
      placeholder="Description"
    />
    <input type="hidden" />
  </form>
  <div class="flex gap-2">
    <ListSettings {list} />
  </div>
</div>
