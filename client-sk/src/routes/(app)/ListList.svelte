<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';

	import { useCreateList, useLists, useUpdateListsOrder } from '@/hooks/useList';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import type { ListsResponse } from '@/lib/types';
	import { flip } from 'svelte/animate';
	import { flipDurationMs } from '@/lib/constants';
	import ListListItem from './ListListItem.svelte';
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

<div class="mb-2 flex items-center justify-between">
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
	class="bg-card max-h-[200px] overflow-y-auto rounded-md border py-2 transition-colors"
>
	{#each listData as list (list.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="relative">
			<ListListItem {list} />
			{#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
				<DragGhost fullWidth />
			{/if}
		</div>
	{/each}
</div>
