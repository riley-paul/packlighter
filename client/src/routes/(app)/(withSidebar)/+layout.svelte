<script lang="ts">
	import ItemList from '@/components/ItemList.svelte';
	import PackingLists from '@/components/PackingLists.svelte';
	import { isSidebarOpen } from '@/lib/store';
	import { Feather } from 'lucide-svelte';
</script>

{#if $isSidebarOpen}
	<aside class="flex h-screen w-[300px] flex-col border-r">
		<header class="h-12 border-b">
			<a href="/" class="flex items-center">
				<Feather class="text-primary mr-2 w-6" />
				<h1 class="font-medium">PackLighter</h1>
			</a>
		</header>
		<section class="flex-1 p-4">
			<PackingLists />
			<ItemList />
		</section>
	</aside>
{/if}
<div class="flex-1 py-6">
	<slot />
</div>
