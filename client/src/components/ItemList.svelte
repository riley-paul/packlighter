<script lang="ts">
	import { useItems, useUpdateItemsOrder } from '@/hooks/useItem';
	import { Input } from '@/components/ui/input';
	import ItemListItem from './ItemListItem.svelte';

	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { ItemsResponse } from '@/lib/types';
	import { flipDurationMs } from '@/lib/constants';
	import { isForeignItem } from '@/lib/store';
	import { useList } from '@/hooks/useList';
	import { getListItemIds, transformDraggedElement } from '@/lib/helpers';
	import DragGhost from '@/components/base/DragGhost.svelte';
	import IconTitleSubtitle from '@/components/base/IconTitleSubtitle.svelte';
	import { SearchX, Table } from 'lucide-svelte';
	import { buttonVariants } from '@/components/ui/button';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	let searchTerm = '';

	type ItemWithShadowItem = ItemsResponse & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: list = useList($page.params.listId);
	$: allListItems = $list.data ? getListItemIds($list.data) : [];

	const items = useItems();
	$: filteredItems = ($items.data
		?.filter((i) => !allListItems.includes(i.id))
		.filter(
			(item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description.toLowerCase().includes(searchTerm.toLowerCase())
		) ?? []) as ItemWithShadowItem[];

	$: updateItemsOrder = useUpdateItemsOrder();
	const handleConsider = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
		$isForeignItem = true;
		filteredItems = ev.detail.items;
	};

	const handleFinalize = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
		filteredItems = ev.detail.items;
		const ids = ev.detail.items.map((item) => item.id);
		$updateItemsOrder.mutate({ itemIds: ids });
		$isForeignItem = false;
	};
</script>

<div class="flex flex-col gap-2 overflow-hidden p-4">
	<div class="flex items-center justify-between gap-4">
		<h3 class="text-sm font-medium">Gear</h3>
		<a class={buttonVariants({ size: 'sm', variant: 'linkMuted' })} href="/gear">
			<Table class="mr-2 w-4" /> All gear
		</a>
	</div>
	<Input
		id="itemsFilter"
		type="search"
		placeholder="Filter..."
		class="bg-card shadow-none"
		bind:value={searchTerm}
	/>
	<div
		class="bg-card overflow-auto rounded-md border transition-colors"
		use:dndzone={{
			items: filteredItems,
			type: 'items',
			dropFromOthersDisabled: true,
			dragDisabled: filteredItems.length === 0,
			flipDurationMs,
			dropTargetStyle: {},
			dropTargetClasses: ['border-primary'],
			transformDraggedElement
		}}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each filteredItems as item (item.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="relative">
				<ItemListItem {item} />
				{#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<DragGhost fullWidth />
				{/if}
			</div>
		{/each}
		{#if $items.isError}
			<p>Error: {$items.error}</p>
		{:else if $items.isLoading}
			<p>Loading...</p>
		{:else}
			{#if filteredItems.length === 0 && searchTerm.length > 0}
				<IconTitleSubtitle>
					<SearchX class="h-10 w-10" />
					<svelte.fragment slot="title">No items found</svelte.fragment>
					<svelte.fragment slot="subtitle">Try searching for something else</svelte.fragment>
				</IconTitleSubtitle>
			{/if}
			{#if filteredItems.length === 0 && searchTerm.length === 0}
				<p class="text-muted-foreground mt-24 flex justify-center p-6 text-sm">No items</p>
			{/if}
		{/if}
	</div>
</div>
