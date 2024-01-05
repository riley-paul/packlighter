<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '@/components/ui/table';
	import { useItems } from '@/hooks/useItem';
	import { formatWeight } from '@/lib/helpers';

	$: items = useItems();
</script>

<Table class="relative">
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead>Description</TableHead>
			<TableHead class="text-right">Weight</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each $items.data ?? [] as item}
			<TableRow>
				<TableCell>{item.name}</TableCell>
				<TableCell class="text-muted-foreground">{item.description}</TableCell>
				<TableCell class="text-right">{formatWeight(item.weight)} {item.weight_unit}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
