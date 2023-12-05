<script lang="ts">
	import { cn } from '$lib/utils';
	import { Delete, Plus } from 'lucide-svelte';
	import { Button } from './ui/button';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { useMutation, useQuery, useQueryClient } from '@sveltestack/svelte-query';

	const lists: RecordModel[] = [];

	const queryClient = useQueryClient();
	const listsQuery = useQuery('lists', () =>
		pb.collection('lists').getFullList({ sort: '-created' })
	);

	const addList = useMutation(
		() => pb.collection('lists').create({ user: pb.authStore.model?.id }),
		{
			onSuccess: (data) => {
				goto(`/${data.id}`);
				queryClient.invalidateQueries('lists');
			}
		}
	);

	const removeList = useMutation((id: string) => pb.collection('lists').delete(id), {
		onSuccess: (data, variables) => {
			if ($page.url.pathname.includes(variables)) goto('/');
			queryClient.invalidateQueries('lists');
		}
	});
</script>

<div class="flex items-center justify-between">
	<h2 class="text-sm font-medium">Lists</h2>
	<Button size="sm" variant="ghost" on:click={() => $addList.mutate()}>
		<Plus class="mr-2 w-4" /> New List
	</Button>
</div>
<div class="overflow-auto">
	{#each $listsQuery.data ?? [] as list}
		<a
			href={`/${list.id}`}
			class={cn(
				'w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between',
				!list.name && 'italic',
				$page.url.pathname.includes(list.id) && 'border-l-4 border-primary pl-3 text-foreground'
			)}
		>
			{list.name || 'Unnamed List'}
			<Button
				size="icon"
				variant="ghost"
				class="h-8 w-8 opacity-0 group-hover:opacity-100"
				on:click={() => $removeList.mutate(list.id)}
			>
				<Delete class="h-4 w-4" />
			</Button>
		</a>
	{/each}
</div>
