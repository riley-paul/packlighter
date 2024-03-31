<script>
	import { Loader2 } from 'lucide-svelte';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex items-center gap-2">
		<Loader2 class="text-primary h-6 w-6 animate-spin" />
		<span class="text-muted-foreground text-sm">Loading...</span>
	</div>
</div>
