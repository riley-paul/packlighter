<script>
	import { isSidebarOpen } from '@/lib/store';
	import AccountEditor from '@/components/AccountEditor.svelte';
	import { Button } from '@/components/ui/button';
	import { Menu } from 'lucide-svelte';
</script>

<header class="flex h-14 items-center border-b">
	{#if !$isSidebarOpen}
		<Button
			size="icon"
			class="h-14 w-14 rounded-none"
			variant="ghost"
			on:click={() => ($isSidebarOpen = true)}
		>
			<Menu size="1.2rem" />
		</Button>
	{/if}
	<div class="flex w-full items-center gap-4 p-4">
		<div class="flex flex-1 items-center justify-between">
			<slot />
		</div>
		<AccountEditor />
	</div>
</header>
