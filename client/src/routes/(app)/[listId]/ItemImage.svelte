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
	import { useDeleteItemImage, useUpdateItem } from '@/hooks/useItem';
	import { Input } from '@/components/ui/input';
	import type { ItemsResponse } from '@/lib/types';
	import TabsList from '@/components/ui/tabs/tabs-list.svelte';
	import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
	import { pb } from '@/lib/pocketbase';

	export let item: ItemsResponse;

	let isOpen = false;
	let uploadedFiles: FileList | undefined;

	$: getImageUrl = (): string | undefined => {
		if (item.image_use_url) {
			return item.image_url;
		} else {
			if (uploadedFiles && uploadedFiles.length > 0 && isOpen)
				return URL.createObjectURL(uploadedFiles[0]);
			if (item.image) return pb.files.getUrl(item, item.image, { thumb: '500x500' });
		}
	};

	$: imageUrl = getImageUrl();

	const updateItem = useUpdateItem();
	const deleteItemImage = useDeleteItemImage();

	$: saveItem = () => {
		$updateItem.mutate({ id: item.id, item, image: uploadedFiles ? uploadedFiles[0] : undefined });
		isOpen = false;
	};
</script>

<Dialog closeOnEscape bind:open={isOpen}>
	<DialogTrigger class="h-full">
		<div
			class={cn(
				'flex w-20 items-center justify-center rounded-sm p-0.5',
				imageUrl ? 'bg-white' : 'bg-muted/50',
				imageUrl ? 'aspect-square' : 'h-full',
				'outline-primary outline-1 transition-all hover:outline'
			)}
		>
			{#if imageUrl}
				<img class="h-full w-full object-contain" src={imageUrl} alt={item.name} />
			{/if}
		</div>
	</DialogTrigger>
	<DialogContent class="p-4">
		<DialogHeader class="text-left">
			<DialogTitle>Update {item.name} Image</DialogTitle>
			<DialogDescription>Upload or provide a link to an image</DialogDescription>
		</DialogHeader>
		<form on:submit={saveItem} class="grid gap-2">
			<Tabs
				value={item.image_use_url ? 'link' : 'upload'}
				onValueChange={(value) => (item.image_use_url = value === 'link')}
			>
				<TabsList class="grid grid-cols-2">
					<TabsTrigger value="upload">Upload</TabsTrigger>
					<TabsTrigger value="link">Link</TabsTrigger>
				</TabsList>
				<TabsContent value="link">
					<Input type="url" placeholder="Image URL" bind:value={item.image_url} />
				</TabsContent>
				<TabsContent value="upload">
					<input
						type="file"
						accept="image/*"
						bind:files={uploadedFiles}
						class="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-inherit px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</TabsContent>
				<div
					class={cn(
						'text-muted-foreground mt-2 flex aspect-square items-center justify-center rounded-md p-2',
						imageUrl ? 'bg-white' : 'bg-muted'
					)}
				>
					{#if imageUrl}
						<img
							class="h-full w-full object-contain"
							src={imageUrl.replace('500x500', '80x80')}
							alt={item.name}
						/>
					{:else}
						No Image
					{/if}
				</div>
			</Tabs>
			<DialogFooter>
				{#if !item.image_use_url && item.image}
					<Button
						type="button"
						variant="destructive"
						disabled={$deleteItemImage.isPending}
						on:click={() => $deleteItemImage.mutate(item.id)}
					>
						Delete Image
					</Button>
				{/if}
				<Button type="submit" disabled={$updateItem.isPending}>
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
