<script lang="ts">
	import DragHandle from '@/components/base/DragHandle.svelte';
	import { Input } from '@/components/ui/input';
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
	import type { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import DeleteButton from '@/components/base/DeleteButton.svelte';
	import { Button, buttonVariants } from '@/components/ui/button';

	import { ArrowLeft, Plus } from 'lucide-svelte';

	$: items = useItems();
	$: updateItemsOrder = useUpdateItemsOrder();
	$: deleteItem = useDeleteItem();
	$: createItem = useCreateItem();

	type ItemWithShadowItem = ItemsResponse & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: itemsData = ($items.data ?? []) as ItemWithShadowItem[];

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
	<div class="bg-background sticky top-0 flex justify-between py-2">
		<a href="/" class={buttonVariants({ variant: 'linkMuted' })}>
			<ArrowLeft class="mr-2 h-4 w-4" />Lists
		</a>
		<Button on:click={() => $createItem.mutate()}>
			<Plus class="mr-2 h-4 w-4" />
			New Item
		</Button>
	</div>
	<div class="columns-sm">
		{#each itemsData as item}
			<div class="hover:bg-muted flex w-full gap-2 rounded-md p-2 transition-colors">
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
						<ItemImage {item} />
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
