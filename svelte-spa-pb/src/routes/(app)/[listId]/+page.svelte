<script lang="ts">
	import { Card } from '$components/ui/card';
	import { page } from '$app/stores';

</script>

<Card>{$page.params.listId}</Card>
