<script lang="ts">
	import IconTitleSubtitle from '@/components/base/IconTitleSubtitle.svelte';
	import AppHeader from '@/components/list/AppHeader.svelte';
	import { Home } from 'lucide-svelte';
</script>

<svelte:head>
	<title>PackLighter</title>
</svelte:head>

<AppHeader />
<IconTitleSubtitle big>
	<Home class="h-16 w-16" />
	<svelte.fragment slot="title">Home</svelte.fragment>
	<svelte.fragment slot="subtitle">Select a list to get packing</svelte.fragment>
</IconTitleSubtitle>
