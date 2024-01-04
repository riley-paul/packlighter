<script lang="ts">
	import { useRemoveList } from '@/hooks/useList';
	import DeleteButton from './base/DeleteButton.svelte';
	import type { ListsResponse } from '@/lib/types';
	import { cn } from '@/lib/utils';
	import { DRAGGABLE_CLASS } from '@/lib/constants';
	import { page } from '$app/stores';

	export let list: ListsResponse;

	$: removeList = useRemoveList();
</script>

<div
	class={cn(
		DRAGGABLE_CLASS,
		'text-muted-foreground flex w-full items-center justify-between gap-2 pl-4 pr-2 hover:border-l-4 hover:pl-3',
		!list.name && 'italic',
		$page.url.pathname.includes(list.id) && 'border-primary text-foreground border-l-4 pl-3'
	)}
>
	<a href={`/${list.id}`} class="flex h-9 flex-1 items-center">
		{list.name || 'Unnamed List'}
	</a>
	<DeleteButton handleDelete={() => $removeList.mutate(list.id)} />
</div>
