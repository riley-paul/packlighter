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
	import { Loader2, Save, Trash } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import { cn } from '@/lib/utils';
	import { useDeleteItemImage, useSetItemImage } from '@/hooks/useItem';
	import type { ItemsResponse } from '@/lib/types';
	import { pb } from '@/lib/pocketbase';

	export let item: ItemsResponse;

	let isOpen = false;
	let uploadedFiles: FileList | undefined;

	const setItemImage = useSetItemImage();
	const deleteItemImage = useDeleteItemImage();

	$: saveItem = () => {
		if (uploadedFiles) {
			$setItemImage.mutate({ id: item.id, image: uploadedFiles[0] });
		}
		isOpen = false;
	};
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
		<form on:submit={saveItem} class="grid gap-4">
			<input
				type="file"
				accept="image/*"
				bind:files={uploadedFiles}
				class="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-inherit px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
			/>

			<div
				class={cn(
					'text-muted-foreground flex aspect-square items-center justify-center rounded-md p-2',
					item.image || uploadedFiles ? 'bg-white' : 'bg-muted'
				)}
			>
				{#if item.image || uploadedFiles}
					<img
						class="h-full w-full object-contain"
						src={uploadedFiles
							? URL.createObjectURL(uploadedFiles[0])
							: pb.files.getUrl(item, item.image, { thumb: '500x500' })}
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
				<Button type="submit" disabled={$setItemImage.isPending}>
					{#if $setItemImage.isPending}
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
