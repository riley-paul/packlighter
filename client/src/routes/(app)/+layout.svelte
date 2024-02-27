<script lang="ts">
	import AccountEditor from '@/routes/(app)/AccountEditor.svelte';
	import ModeToggle from '@/components/base/ModeToggle.svelte';
	import { Feather, Sidebar } from 'lucide-svelte';
	import { Toggle } from '@/components/ui/toggle';
	import { isSidebarOpen } from '@/lib/store';
</script>

<main class="flex">
	<slot />
</main>
