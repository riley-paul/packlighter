<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog";
  import { Loader2, Save } from "lucide-svelte";
  import { Button, buttonVariants } from "./ui/button";
  import { cn } from "@/lib/utils";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { useUpdateItem } from "@/hooks/useItem";
  import { Input } from "./ui/input";

  export let item: RecordModel;

  let url = item.image_url;
  let isOpen = false;

  const queryClient = useQueryClient();
  const updateItem = useUpdateItem(queryClient);

  $: saveItem = () => {
    $updateItem.mutate({ ...item, image_url: url });
    isOpen = false;
  };
</script>

<Dialog closeOnEscape bind:open={isOpen}>
  <DialogTrigger>
    <div
      class={cn(
        "h-24 p-0.5 aspect-square rounded-sm flex justify-center items-center",
        item.image_url ? "bg-white" : "bg-muted"
      )}
    >
      {#if item.image_url}
        <img
          class="h-full w-full object-contain"
          src={item.image_url}
          alt={item.name}
        />
      {/if}
    </div>
  </DialogTrigger>
  <DialogContent class="p-4">
    <DialogHeader class="text-left">
      <DialogTitle>Update {item.name} Image</DialogTitle>
      <DialogDescription>Provide a link to an image</DialogDescription>
    </DialogHeader>
    <form on:submit={saveItem} class="grid gap-4">
      <Input type="url" placeholder="Image URL" bind:value={url} />

      {#if url}
        <div
          class="bg-white rounded-md p-2 flex items-center aspect-square justify-center"
        >
          <img class="object-contain h-full w-full" src={url} alt={item.name} />
        </div>
      {:else}
        <div
          class="rounded-md bg-muted w-full p-4 flex items-center justify-center text-muted-foreground"
        >
          No Image
        </div>
      {/if}
      <DialogFooter>
        <Button
          type="submit"
          disabled={$updateItem.isPending || url === item.image_url}
        >
          {#if $updateItem.isPending}
            <Loader2 class="h-4 w-4 mr-2 animate-spin" />
          {:else}
            <Save class="h-4 w-4 mr-2" />
          {/if}
          Save
        </Button>
      </DialogFooter>
      <input type="hidden" />
    </form>
  </DialogContent>
</Dialog>
