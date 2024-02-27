<script lang="ts">
	import { isSidebarOpen } from '@/lib/store';
	import ListList from '@/routes/(app)/PackingLists.svelte';
	import ItemList from '@/routes/(app)/ItemList.svelte';
	import { Feather } from 'lucide-svelte';
</script>

{#if $isSidebarOpen}
	<aside class="flex h-screen w-[300px] flex-col">
		<header class="h-12 border-b">
			<a href="/" class="flex items-center">
				<Feather class="text-primary mr-2 w-6" />
				<h1 class="font-medium">PackLighter</h1>
			</a>
		</header>
		<section class="p-4 flex-1">
			<ListList />
			<ItemList />
		</section>
	</aside>
{/if}
<div class="flex-1 py-6">
	<slot />
</div>
