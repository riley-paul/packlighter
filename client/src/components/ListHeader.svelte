<script lang="ts">
	import { Textarea } from '@/components/ui/textarea';
	import { useUpdateList, type ListWithCategories } from '@/hooks/useList';

	export let list: ListWithCategories;

	$: updateList = useUpdateList();
	$: saveList = () => $updateList.mutate({ id: list.id, list });
</script>

<form on:submit={saveList} class="flex-1 space-y-2">
	<Textarea
		bind:value={list.description}
		on:blur={saveList}
		class="placeholder:italic"
		placeholder="Description"
	/>
	<input type="hidden" />
</form>
