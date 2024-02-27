<script lang="ts">
	import { useRemoveList } from '@/hooks/useList';
	import type { ListsResponse } from '@/lib/types';
	import { cn } from '@/lib/utils';
	import { DRAGGABLE_CLASS } from '@/lib/constants';
	import { page } from '$app/stores';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuShortcut,
		DropdownMenuTrigger
	} from '@/components/ui/dropdown-menu';
	import { Copy, Delete, MoreHorizontal } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';

	export let list: ListsResponse;

	$: removeList = useRemoveList();
</script>

<div
	class={cn(
		DRAGGABLE_CLASS,
		'flex w-full items-center justify-between gap-2 py-0.5 pl-4 pr-2 hover:border-l-4 hover:pl-3',
		!list.name && 'text-muted-foreground italic',
		$page.url.pathname.includes(list.id) &&
			'border-primary text-secondary-foreground bg-secondary border-l-4 pl-3'
	)}
>
	<a href={`/${list.id}`} class="flex h-8 flex-1 items-center truncate">
		{list.name || 'Unnamed List'}
	</a>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Button variant="ghost" class="h-8 w-8 p-0">
				<span class="sr-only">Open menu</span>
				<MoreHorizontal class="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuItem on:click={() => $removeList.mutate(list.id)}>
				Delete List
				<DropdownMenuShortcut>
					<Delete size="1rem" />
				</DropdownMenuShortcut>
			</DropdownMenuItem>
			<DropdownMenuItem disabled>
				Duplicate List
				<DropdownMenuShortcut>
					<Copy size="1rem" />
				</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</div>
