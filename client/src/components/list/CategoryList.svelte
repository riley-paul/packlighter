<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { type ExpandedCategory, type ListWithCategories } from '@/hooks/useList';
	import { useCreateCategory, useUpdateCategoriesOrder } from '@/hooks/useCategory';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import { flipDurationMs } from '@/lib/constants';
	import DragGhost from '@/components/base/DragGhost.svelte';
	import { transformDraggedElement } from '@/lib/helpers';
	import Category from './Category.svelte';

	export let list: ListWithCategories;

	$: createCategory = useCreateCategory();
	$: updateCategoriesOrder = useUpdateCategoriesOrder();

	type CategoryWithShadowItem = ExpandedCategory & {
		[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
	};

	$: categories = list.categories as CategoryWithShadowItem[];

	const handleConsider = (ev: CustomEvent<DndEvent<ExpandedCategory>>) => {
		categories = ev.detail.items;
	};

	const handleFinalize = (ev: CustomEvent<DndEvent<ExpandedCategory>>) => {
		categories = ev.detail.items;
		const ids = ev.detail.items.map((item) => item.id);
		$updateCategoriesOrder.mutate({ categoryIds: ids });
	};
</script>

<div
	class="flex flex-col gap-4"
	use:dndzone={{
		items: categories,
		flipDurationMs,
		type: 'categories',
		dropTargetStyle: {},
		transformDraggedElement
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each categories as category (category.id)}
		<div class="relative">
			<Category {category} {list} />
			{#if category[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
				<DragGhost />
			{/if}
		</div>
	{/each}
</div>
<div>
	<Button
		variant="linkMuted"
		size="sm"
		on:click={() => $createCategory.mutate(list.id)}
		disabled={$createCategory.isPending}
	>
		<Plus class="mr-2 h-4 w-4" />
		Add Category
	</Button>
</div>
