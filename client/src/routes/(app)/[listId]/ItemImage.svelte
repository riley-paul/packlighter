<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '@/components/ui/dialog';
	import { Loader2, Save } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { cn } from '@/lib/utils';
	import { useUpdateItem } from '@/hooks/useItem';
	import { Input } from '@/components/ui/input';
	import type { ItemsResponse } from '@/lib/types';

	export let item: ItemsResponse;

	let url = item.image_url;
	let isOpen = false;

	const updateItem = useUpdateItem();

	$: saveItem = () => {
		$updateItem.mutate({ id: item.id, item: { image_url: url } });
		isOpen = false;
	};
</script>

<Dialog closeOnEscape bind:open={isOpen}>
	<DialogTrigger>
		<div
			class={cn(
				'flex w-20 items-center justify-center rounded-sm p-0.5',
				item.image_url ? 'bg-white' : 'bg-muted/50',
				item.image_url ? 'aspect-square' : 'h-[1rem]',
				'outline-muted-foreground/50 transition-all hover:outline'
			)}
		>
			{#if item.image_url}
				<img class="h-full w-full object-contain" src={item.image_url} alt={item.name} />
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
				<div class="flex aspect-square items-center justify-center rounded-md bg-white p-2">
					<img class="h-full w-full object-contain" src={url} alt={item.name} />
				</div>
			{:else}
				<div
					class="bg-muted text-muted-foreground flex w-full items-center justify-center rounded-md p-4"
				>
					No Image
				</div>
			{/if}
			<DialogFooter>
				<Button type="submit" disabled={$updateItem.isPending || url === item.image_url}>
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
