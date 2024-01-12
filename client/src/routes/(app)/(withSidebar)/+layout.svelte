<script lang="ts">
	import { isSidebarOpen } from '@/lib/store';
	import { fly } from 'svelte/transition';
	import ListList from '@/routes/(app)/ListList.svelte';
	import ItemList from '@/routes/(app)/ItemList.svelte';
</script>

{#if $isSidebarOpen}
	<aside
		in:fly={{ y: 0, duration: 200 }}
		out:fly={{ y: 0, duration: 200 }}
		class="sticky top-0 flex w-[300px] flex-col pb-6 pt-4"
		style="height: calc(100vh - 3.5rem);"
	>
		<ListList />
		<br />
		<ItemList />
	</aside>
{/if}
<div class="flex-1 py-6">
	<slot />
</div>
