<script lang="ts">
	import { Separator } from '@/components/ui/separator';
	import ItemList from '@/components/ItemList.svelte';
	import PackingLists from '@/components/PackingLists.svelte';
	import { Button } from '@/components/ui/button';
	import { isSidebarOpen } from '@/lib/store';
	import { Feather, Menu } from 'lucide-svelte';
</script>

<main class="flex h-screen overflow-hidden">
	<aside class="flex h-screen w-[300px] flex-col overflow-hidden border-r">
		<header class="flex h-14 border-b">
			<Button
				size="icon"
				variant="ghost"
				class="h-14 w-14 rounded-none"
				on:click={() => ($isSidebarOpen = false)}
			>
				<Menu size="1.2rem" />
			</Button>
			<a href="/" class="flex items-center px-2">
				<Feather class="text-primary mr-2 w-6" />
				<h1 class="font-medium">PackLighter</h1>
			</a>
		</header>
		<PackingLists />
		<Separator />
		<ItemList />
	</aside>
	<div class="flex-1">
		<slot />
	</div>
</main>
