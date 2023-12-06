<script lang="ts">
	import { Card } from '$components/ui/card';
	import { page } from '$app/stores';
	import { Button } from '$components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { useMutation, useQuery, useQueryClient } from '@sveltestack/svelte-query';
	import { pb } from '$lib/pocketbase';

	const queryClient = useQueryClient();

	let { listId } = $page.params;

	$: console.log(listId);

	const queryList = useQuery({
		queryKey: ['list', $page.params.listId],
		queryFn: ({ queryKey }) => {
			console.log(queryKey);
			return pb.collection('lists').getOne(queryKey[1]);
		}
	});

	const createCategory = useMutation(() =>
		pb.collection('list_categories').create({ list: $page.params.listId })
	);
</script>

<Card class="flex-1 p-6 h-fit @container">
	{#if $queryList.isError}
		<p>Error: {$queryList.error}</p>
	{:else if $queryList.isLoading}
		<p>Loading...</p>
	{:else}
		<div class="flex flex-col gap-4">
			{$queryList.data?.name}
			<!-- <ListHeader list={$queryList.data} /> -->
			<!-- <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			{queryList.data.categories.map((c) => (
				<Category
				key={c.id}
				category={c}
				list={queryList.data}
				sortDisabled={sortCategoryItems.isPending}
				/>
				))}
			</DndContext> -->
			<div>
				<Button
					variant="linkMuted"
					size="sm"
					on:click={() => $createCategory.mutate()}
					disabled={$createCategory.isLoading}
				>
					<Plus class="h-4 w-4 mr-2" />
					Add Category
				</Button>
			</div>
		</div>
	{/if}
</Card>
