<script lang="ts">
	import { cn } from '$lib/utils';
	import { Delete, Plus } from 'lucide-svelte';
	import { Button } from './ui/button';

	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let lists: RecordModel[];

	const addList = async () => {
		const newList = await pb.collection('lists').create({ user: pb.authStore.model?.id });
		invalidate('/');
		// window.location.href = `/${newList.id}`;
	};
</script>

<div class="flex items-center justify-between">
	<h2 class="text-sm font-medium">Lists</h2>
	<Button size="sm" variant="ghost" on:click={addList}>
		<Plus class="mr-2 w-4" /> New List
	</Button>
</div>
<div class="overflow-auto">
	{#each lists as list}
		<a
			href={`/${list.id}`}
			class={cn(
				'w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between',
				!list.name && 'italic',
				$page.url.pathname.includes(list.id) && 'border-l-4 border-primary pl-3 text-foreground'
			)}
		>
			{list.name || 'Unnamed List'}
			<Button size="icon" variant="ghost" class="h-8 w-8 opacity-0 group-hover:opacity-100">
				<Delete class="h-4 w-4" />
			</Button>
		</a>
	{/each}
</div>
