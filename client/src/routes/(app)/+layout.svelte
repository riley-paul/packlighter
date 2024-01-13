<script lang="ts">
	import AccountEditor from '@/routes/(app)/AccountEditor.svelte';
	import ModeToggle from '@/components/base/ModeToggle.svelte';
	import { Feather, Sidebar } from 'lucide-svelte';
	import { Toggle } from '@/components/ui/toggle';
	import { isSidebarOpen } from '@/lib/store';
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<header
		class="bg-card scroll-gutter z-50 flex min-h-14 w-full items-center overflow-auto border-b"
	>
		<div class="container flex justify-between">
			<div class="flex items-center gap-2 text-lg">
				<Toggle bind:pressed={$isSidebarOpen} variant="outline" class="h-8 w-8 p-0">
					<Sidebar class="h-4 w-4" />
				</Toggle>
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
	<div class="scroll-gutter overflow-auto" style="height: calc(100vh-3.5rem);">
		<main class="container flex gap-6">
			<slot />
		</main>
	</div>
</div>
