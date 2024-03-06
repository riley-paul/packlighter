<script lang="ts">
	import { Loader2, Plus } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';

	import { useCreateList, useLists, useUpdateListsOrder } from '@/hooks/useList';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import { Collections, type ListsResponse } from '@/lib/types';
	import { flip } from 'svelte/animate';
	import { flipDurationMs } from '@/lib/constants';
	import ListListItem from './PackingList.svelte';
	import DragGhost from '@/components/base/DragGhost.svelte';
	import { transformDraggedElement } from '@/lib/helpers';
	import { createQuery } from '@tanstack/svelte-query';
	import { getLists } from '@/api/list';
	import IconTitleSubtitle from './base/IconTitleSubtitle.svelte';
	import Loader from './base/Loader.svelte';

	type ListWithShadowItem = ListsResponse & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: listsQuery = createQuery({
		queryFn: getLists,
		queryKey: [Collections.Lists]
	});
	$: createList = useCreateList();

	$: listData = ($listsQuery.data ?? []) as ListWithShadowItem[];

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

<section class="flex h-full max-h-[40vh] flex-1 flex-col gap-2 p-4">
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
		class="bg-card h-full overflow-y-auto rounded-md border py-2 transition-colors"
	>
		{#if $listsQuery.isSuccess}
			{#each listData as list (list.id)}
				<div animate:flip={{ duration: flipDurationMs }} class="relative">
					<ListListItem {list} />
					{#if list[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
						<DragGhost fullWidth />
					{/if}
				</div>
			{/each}
			{#if listData.length === 0}
				<p class="text-muted-foreground flex h-full items-center justify-center p-6 text-sm">
					No lists
				</p>
			{/if}
		{/if}

		{#if $listsQuery.isLoading}
			<Loader />
		{/if}
	</div>
</section>
