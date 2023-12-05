<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({ defaultOptions: { queries: { enabled: browser } } });
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
