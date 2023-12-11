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
        "flex aspect-square h-20 items-center justify-center rounded-sm p-0.5",
        item.image_url ? "bg-white" : "bg-muted",
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
          class="flex aspect-square items-center justify-center rounded-md bg-white p-2"
        >
          <img class="h-full w-full object-contain" src={url} alt={item.name} />
        </div>
      {:else}
        <div
          class="flex w-full items-center justify-center rounded-md bg-muted p-4 text-muted-foreground"
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
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Save class="mr-2 h-4 w-4" />
          {/if}
          Save
        </Button>
      </DialogFooter>
      <input type="hidden" />
    </form>
  </DialogContent>
</Dialog>
