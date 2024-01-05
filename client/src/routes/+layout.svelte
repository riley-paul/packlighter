<script>
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { queryClient } from '@/lib/query';
</script>

<svelte:head>
	<title>PackLighter</title>
</svelte:head>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
