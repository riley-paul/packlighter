<script lang="ts">
	import AccountEditor from '@/routes/(app)/AccountEditor.svelte';
	import ItemList from '@/routes/(app)/ItemList.svelte';
	import ListList from '@/routes/(app)/ListList.svelte';
	import ModeToggle from '@/components/base/ModeToggle.svelte';
	import { Feather } from 'lucide-svelte';
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<header class="bg-card z-50 flex min-h-14 w-full items-center border-b">
		<div class="container flex justify-between">
			<div class="flex items-center gap-2 text-lg">
				<a href="/" class="flex items-center">
					<Feather class="text-primary mr-2 w-6" />
					<h1 class="font-medium">PackLighter</h1>
				</a>
			</div>
			<div class="flex items-center gap-4">
				<AccountEditor />
				<ModeToggle />
			</div>
		</div>
	</header>
	<div class="overflow-auto" style="height: calc(100vh-3.5rem);">
		<main class="container grid grid-cols-[300px_1fr] gap-6">
			<aside
				class="sticky top-0 flex w-[300px] flex-col py-4"
				style="height: calc(100vh - 3.5rem);"
			>
				<ListList />
				<br />
				<ItemList />
			</aside>
			<div class="scroll-gutter flex-1 py-6">
				<slot />
			</div>
		</main>
	</div>
</div>
