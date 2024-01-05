<script lang="ts">
	import { Card } from '@/components/ui/card';
	import { Loader2 } from 'lucide-svelte';
	import { useList } from '@/hooks/useList';
	import ListHeader from '@/routes/(app)/[listId]/ListHeader.svelte';
	import CategoryList from '@/routes/(app)/[listId]/CategoryList.svelte';
	import { CATEGORY_NAME_CLASS } from '@/lib/constants';
	import { waitForElm } from '@/lib/helpers';
	import { tick } from 'svelte';
	import WeightChart from '@/routes/(app)/[listId]/WeightChart.svelte';
	import WeightTable from '@/routes/(app)/[listId]/WeightTable.svelte';
	import IconTitleSubtitle from '@/components/base/IconTitleSubtitle.svelte';
	import { page } from '$app/stores';

	$: list = useList($page.params.listId);

	const handleCategoryCreated = (ev: CustomEvent<{ id: string }>) =>
		tick().then(() =>
			waitForElm<HTMLInputElement>(`#${ev.detail.id} input.${CATEGORY_NAME_CLASS}`).then(
				(element) => {
					element?.scrollIntoView({ behavior: 'smooth' });
					element?.focus();
				}
			)
		);

	$: pageTitle = $list.data?.name ? ['PackLighter', $list.data?.name].join(' - ') : 'PackLighter';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<Card class="@container h-fit flex-1 p-6">
	{#if $list.isError}
		<p>Error: {$list.error}</p>
	{:else if $list.isLoading}
		<IconTitleSubtitle>
			<Loader2 class="text-primary h-10 w-10 animate-spin" />
			<svelte.fragment slot="title">Loading your list</svelte.fragment>
			<svelte.fragment slot="subtitle">Please wait one moment...</svelte.fragment>
		</IconTitleSubtitle>
	{:else if $list.data}
		<div class="flex flex-col gap-4">
			{#if $list.data.show_weights}
				<div class="flex justify-center">
					<div class="flex items-center gap-8">
						<WeightChart list={$list.data} />
						<WeightTable list={$list.data} />
					</div>
				</div>
			{/if}
			<ListHeader list={$list.data} />
			<CategoryList list={$list.data} on:categoryCreated={handleCategoryCreated} />
		</div>
	{/if}
</Card>
