<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
