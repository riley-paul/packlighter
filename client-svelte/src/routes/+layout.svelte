<script>
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { queryClient } from '@/lib/query';
	import { Toaster } from '@/components/ui/sonner';
</script>

<svelte:head>
	<title>PackLighter</title>
</svelte:head>

<ModeWatcher />
<Toaster />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
