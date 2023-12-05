<script lang="ts">
	import AccountEditor from '$components/AccountEditor.svelte';
	import ListList from '$components/ListList.svelte';
	import ModeToggle from '$components/ModeToggle.svelte';
	import { buttonVariants } from '$components/ui/button';
	import Toggle from '$components/ui/toggle/toggle.svelte';
	import { cn } from '$lib/utils';
	import { Feather, MoreVertical } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	let isSidebarOpen = false;

	export let data: LayoutData;
	const { lists } = data;
</script>

<div class="flex overflow-hidden h-screen">
	<aside
		class={cn(
			'border-r w-0 shadow-inner transition-all',
			isSidebarOpen && 'w-[250px]',
			'flex flex-col overflow-hidden h-full'
		)}
	>
		<!-- <ItemList /> -->
	</aside>
	<div class="flex-1 overflow-hidden flex flex-col">
		<header class="w-full border-b h-14 flex items-center bg-card shadow z-50">
			<div class="container flex justify-between">
				<div class="flex gap-4 items-center">
					<Toggle
						aria-label="Toggle sidebar"
						aria-checked={isSidebarOpen}
						on:click={() => (isSidebarOpen = !isSidebarOpen)}
						class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'p-0')}
					>
						<MoreVertical class="w-4 h-4" />
					</Toggle>
					<a href="/" class="flex items-center">
						<Feather class="mr-2 w-6 text-primary" />
						<h1 class="font-medium text-lg">PackLighter</h1>
					</a>
				</div>
				<div class="flex gap-4 items-center">
					<AccountEditor />
					<ModeToggle />
				</div>
			</div>
		</header>
		<main class="flex-1 py-6 overflow-auto">
			<div class="container grid gap-4 grid-cols-[1fr_250px]">
				<slot />
				<aside class="h-fit">
					<ListList {lists} />
				</aside>
			</div>
		</main>
	</div>
</div>
