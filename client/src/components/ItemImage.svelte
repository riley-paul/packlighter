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
	import { Trash } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { cn } from '@/lib/utils';
	import { useDeleteItemImage, useSetItemImage } from '@/hooks/useItem';
	import type { ItemsResponse } from '@/lib/types';
	import { pb } from '@/lib/pocketbase';
	import { onDestroy, onMount } from 'svelte';
	import { Input } from '@/components/ui/input';

	export let item: ItemsResponse;

	let isOpen = false;

	const setItemImage = useSetItemImage();
	const deleteItemImage = useDeleteItemImage();

	const pasteFiles = (e: ClipboardEvent) => {
		if (isOpen && e.clipboardData?.files?.length) {
			$setItemImage.mutate({ id: item.id, image: e.clipboardData.files[0] });
		}
	};

	const handleInputChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			$setItemImage.mutate({ id: item.id, image: target.files[0] });
		}
	};

	onMount(() => window.addEventListener('paste', pasteFiles));
	onDestroy(() => window.removeEventListener('paste', pasteFiles));
</script>

<Dialog closeOnEscape bind:open={isOpen}>
	<DialogTrigger class="h-full">
		<div
			class={cn(
				'flex w-20 items-center justify-center rounded-sm p-0.5',
				item.image ? 'aspect-square bg-white' : 'bg-muted/50 h-full',
				'outline-primary outline-1 transition-all hover:outline'
			)}
		>
			{#if item.image}
				<img
					class="h-full w-full object-contain"
					src={pb.files.getUrl(item, item.image, { thumb: '80x80' })}
					alt={item.name}
				/>
			{/if}
		</div>
	</DialogTrigger>
	<DialogContent class="p-4">
		<DialogHeader class="text-left">
			<DialogTitle>Update {item.name} Image</DialogTitle>
			<DialogDescription>Upload or provide a link to an image</DialogDescription>
		</DialogHeader>
		<Input type="file" accept="image/*" on:change={handleInputChange} />

		<div
			class={cn(
				'text-muted-foreground flex aspect-square items-center justify-center rounded-md p-2',
				item.image ? 'bg-white' : 'bg-muted'
			)}
		>
			{#if item.image}
				<img
					class="h-full w-full object-contain"
					src={pb.files.getUrl(item, item.image, { thumb: '500x500' })}
					alt={item.name}
				/>
			{:else}
				No Image
			{/if}
		</div>

		<DialogFooter>
			<Button
				type="button"
				variant="destructive"
				disabled={$deleteItemImage.isPending}
				on:click={() => $deleteItemImage.mutate(item.id)}
			>
				<Trash class="mr-2 h-4 w-4" />
				Delete Image
			</Button>
		</DialogFooter>
		<input type="hidden" />
	</DialogContent>
</Dialog>
