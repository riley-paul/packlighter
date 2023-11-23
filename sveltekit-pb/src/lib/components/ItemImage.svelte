<script lang="ts">
  import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogDescription,
  } from "$components/ui/dialog";
  import { Button } from "./ui/button";

  import { cn } from "$lib/utils";
  import type { RecordModel } from "pocketbase";
  import Input from "./ui/input/input.svelte";
  import { Save } from "lucide-svelte";
  import { enhance } from "$app/forms";
  export let item: RecordModel;

  let url = item.image_url;
</script>

<Dialog>
  <DialogTrigger>
    <div
      class={cn(
        "h-12 p-0.5 aspect-square rounded-sm flex justify-center items-center",
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
    <form
      action="/gear?/updateItem"
      method="post"
      class="grid gap-4"
      use:enhance
    >
      <input type="hidden" name="id" value={item.id} />
      <DialogHeader class="text-left">
        <DialogTitle>Update Image</DialogTitle>
        <DialogDescription>Provide a link to an image</DialogDescription>
      </DialogHeader>
      <Input
        name="image_url"
        type="url"
        placeholder="Image URL"
        bind:value={url}
      />
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
        <Button type="submit" disabled={url === item.image_url}>
          <Save class="h-4 w-4 mr-2" />
          Save
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
