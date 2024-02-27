<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';

	import { useCreateList, useLists, useUpdateListsOrder } from '@/hooks/useList';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import type { ListsResponse } from '@/lib/types';
	import { flip } from 'svelte/animate';
	import { flipDurationMs } from '@/lib/constants';
	import ListListItem from './PackingList.svelte';
	import DragGhost from '@/components/base/DragGhost.svelte';
	import { transformDraggedElement } from '@/lib/helpers';

	type ListWithShadowItem = ListsResponse & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: lists = useLists();
	$: createList = useCreateList();

	$: listData = ($lists.data ?? []) as ListWithShadowItem[];

	$: updateListOrder = useUpdateListsOrder();
	const handleConsider = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
		listData = ev.detail.items;
	};

	const handleFinalize = (ev: CustomEvent<DndEvent<ListsResponse>>) => {
		listData = ev.detail.items;
		const ids = ev.detail.items.map((item) => item.id);
		$updateListOrder.mutate({ listIds: ids });
	};
</script>

<section class="flex h-full max-h-[30vh] flex-col gap-2 p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium">Lists</h2>
		<Button size="sm" variant="linkMuted" on:click={() => $createList.mutate()}>
			<Plus class="mr-2 w-4" /> New List
		</Button>
	</div>
	<div
		use:dndzone={{
			items: listData,
			type: 'lists',
			flipDurationMs,
			dropTargetStyle: {},
			dropTargetClasses: ['border-primary'],
			transformDraggedElement
		}}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
		class="bg-card overflow-y-auto rounded-md border py-2 transition-colors"
	>
		{#each listData as list (list.id)}
			<div animate:flip={{ duration: flipDurationMs }} class="relative">
				<ListListItem {list} />
				{#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<DragGhost fullWidth />
				{/if}
			</div>
		{/each}
		{#if listData.length === 0}
			<p class="text-muted-foreground flex w-full justify-center p-6 text-sm">No lists</p>
		{/if}
	</div>
</section>
