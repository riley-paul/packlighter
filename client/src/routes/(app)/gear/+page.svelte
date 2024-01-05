<script lang="ts">
	import DragHandle from '@/components/base/DragHandle.svelte';
	import { Input } from '@/components/ui/input';
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
	import { ItemsWeightUnitOptions } from '@/lib/types';

	$: items = useItems();
</script>

<svelte:head>
	<title>PackLighter - Gear</title>
</svelte:head>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead class="w-0" />
			<TableHead class="w-64 pl-5">Name</TableHead>
			<TableHead class="pl-5">Description</TableHead>
			<TableHead class="w-32 text-right">Weight</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each $items.data ?? [] as item}
			<TableRow>
				<TableCell>
					<DragHandle />
				</TableCell>
				<TableCell>
					<Input
						class="h-auto border-none py-0.5 shadow-none placeholder:italic"
						placeholder="Unnamed item"
						autocomplete="off"
						bind:value={item.name}
					/>
				</TableCell>
				<TableCell class="text-muted-foreground">
					<Input
						class="h-auto border-none py-0.5 shadow-none placeholder:italic"
						placeholder="Description"
						autocomplete="off"
						bind:value={item.description}
					/>
				</TableCell>
				<TableCell class="flex justify-end text-right">
					<Input
						bind:value={item.weight}
						type="number"
						autocomplete="off"
						min="0"
						class="h-auto border-none px-1 py-0.5 text-right shadow-none"
					/>
					<select bind:value={item.weight_unit} class="bg-inherit">
						{#each Object.values(ItemsWeightUnitOptions) as massUnit}
							<option value={massUnit}>
								{massUnit}
							</option>
						{/each}
					</select>
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
