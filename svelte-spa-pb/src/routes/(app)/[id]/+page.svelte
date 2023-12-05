<script lang="ts">
	import { Card } from '$components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Card>{data.list.name}</Card>
