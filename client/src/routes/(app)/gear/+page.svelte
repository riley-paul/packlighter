<script lang="ts">
	import DragHandle from '@/components/base/DragHandle.svelte';
	import { Input } from '@/components/ui/input';
	import { Textarea } from '@/components/ui/textarea';
	import { Card } from '@/components/ui/card';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '@/components/ui/table';
	import { useItems, useUpdateItemsOrder, useDeleteItem, useCreateItem } from '@/hooks/useItem';
	import { ItemsWeightUnitOptions, type ItemsResponse } from '@/lib/types';
	import ItemImage from '@/components/ItemImage.svelte';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import DeleteButton from '@/components/base/DeleteButton.svelte';
	import { Button, buttonVariants } from '@/components/ui/button';
	import { flipDurationMs } from '@/lib/constants';
	import { getListItemIds, transformDraggedElement } from '@/lib/helpers';
	import { flip } from 'svelte/animate';

	import { ArrowLeft, Plus } from 'lucide-svelte';
	import DragGhost from '@/components/base/DragGhost.svelte';

	$: items = useItems();
	$: updateItemsOrder = useUpdateItemsOrder();
	$: deleteItem = useDeleteItem();
	$: createItem = useCreateItem();

	let searchTerm = '';

	type ItemWithShadowItem = ItemsResponse & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: itemsData = ($items.data?.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase())
	) ?? []) as ItemWithShadowItem[];

	const templateCols = [];

	const handleConsider = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
		itemsData = ev.detail.items;
	};

	const handleFinalize = (ev: CustomEvent<DndEvent<ItemsResponse>>) => {
		itemsData = ev.detail.items;
		const ids = ev.detail.items.map((item) => item.id);
		$updateItemsOrder.mutate({ itemIds: ids });
	};
</script>

<svelte:head>
	<title>PackLighter - Gear</title>
</svelte:head>

<div class="flex w-full flex-col gap-4">
	<div
		class="from-background sticky top-0 z-50 flex justify-between bg-gradient-to-b from-90% py-2"
	>
		<a href="/" class={buttonVariants({ variant: 'linkMuted' })}>
			<ArrowLeft class="mr-2 h-4 w-4" />Lists
		</a>
		<div class="flex flex-1 justify-end gap-2">
			<Input
				type="search"
				placeholder="Filter..."
				class="bg-card max-w-64"
				bind:value={searchTerm}
			/>
			<Button on:click={() => $createItem.mutate()}>
				<Plus class="mr-2 h-4 w-4" />
				New Item
			</Button>
		</div>
	</div>
	<div
		class="grid grid-cols-1 gap-2 rounded-lg p-1 md:grid-cols-2 lg:grid-cols-3"
		use:dndzone={{
			items: itemsData,
			type: 'items',
			dropFromOthersDisabled: true,
			flipDurationMs,
			dropTargetStyle: {},
			dropTargetClasses: ['outline', 'outline-1', 'outline-primary'],
			transformDraggedElement
		}}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each itemsData as item (item.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="relative">
				<Card class="hover:bg-muted/50 flex w-full gap-2 rounded-md p-2 transition-colors">
					<ItemImage {item} fullSizePlaceholer />
					<div class="flex-1">
						<Input
							class="h-auto border-none py-0.5 font-medium shadow-none placeholder:italic"
							placeholder="Unnamed item"
							autocomplete="off"
							bind:value={item.name}
						/>
						<Input
							class="h-auto border-none py-0.5 shadow-none placeholder:italic"
							placeholder="Description"
							autocomplete="off"
							bind:value={item.description}
						/>
					</div>
					<DeleteButton handleDelete={() => $deleteItem.mutate(item.id)} />
				</Card>
				{#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<DragGhost fullWidth />
				{/if}
			</div>
		{/each}
	</div>

	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-0">Image</TableHead>
				<TableHead class="w-64 pl-5">Name</TableHead>
				<TableHead class="pl-5">Description</TableHead>
				<TableHead class="w-32 text-right">Weight</TableHead>
				<TableHead class="w-0" />
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each itemsData as item}
				<TableRow>
					<TableCell>
						<ItemImage {item} fullSizePlaceholer />
					</TableCell>
					<TableCell>
						<Input
							class="h-auto border-none py-0.5 shadow-none placeholder:italic"
							placeholder="Unnamed item"
							autocomplete="off"
							bind:value={item.name}
						/>
					</TableCell>
					<TableCell class="text-muted-foreground">
						<Input
							class="h-auto border-none py-0.5 shadow-none placeholder:italic"
							placeholder="Description"
							autocomplete="off"
							bind:value={item.description}
						/>
					</TableCell>
					<TableCell class="flex justify-end text-right">
						<Input
							bind:value={item.weight}
							type="number"
							autocomplete="off"
							min="0"
							class="h-auto border-none px-1 py-0.5 text-right shadow-none"
						/>
						<select bind:value={item.weight_unit} class="bg-inherit">
							{#each Object.values(ItemsWeightUnitOptions) as massUnit}
								<option value={massUnit}>
									{massUnit}
								</option>
							{/each}
						</select>
					</TableCell>
					<TableCell>
						<DeleteButton handleDelete={() => $deleteItem.mutate(item.id)} />
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
