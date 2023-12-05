<script lang="ts">
	import { cn } from '$lib/utils';
	import { Delete, Plus } from 'lucide-svelte';
	import { Button } from './ui/button';

	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import { pb } from '$lib/pocketbase';

	const query = createQuery({
		queryKey: ['lists'],
		queryFn: () => pb.collection('lists').getFullList()
	});
</script>

<div class="flex items-center justify-between">
	<h2 class="text-sm font-medium">Lists</h2>
	<Button size="sm" variant="ghost">
		<Plus class="mr-2 w-4" /> New List
	</Button>
</div>
<div class="overflow-auto">
	{#if $query.isLoading}
		<p>Loading...</p>
	{:else if $query.isError}
		<p>Error: {$query.error.message}</p>
	{:else if $query.isSuccess}
		{#each $query.data as list}
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
	{/if}
</div>
