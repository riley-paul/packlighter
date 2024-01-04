<script lang="ts">
	import { Settings } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuCheckboxItem,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuSub,
		DropdownMenuSubContent,
		DropdownMenuSubTrigger,
		DropdownMenuTrigger
	} from '@/components/ui/dropdown-menu';
	import { useUpdateList, type ListWithCategories } from '@/hooks/useList';
	import { ItemsWeightUnitOptions } from '@/lib/types';

	let bookmarks = false;
	let fullUrls = true;

	const profileRadioValue = 'benoit';

	export let list: ListWithCategories;

	$: updateList = useUpdateList();
	$: saveList = () => $updateList.mutate({ id: list.id, list });
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="h-full">
			<Settings class="h-4 w-4" />
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-52">
		<DropdownMenuLabel>List Settings</DropdownMenuLabel>
		<DropdownMenuSeparator />
		<DropdownMenuCheckboxItem bind:checked={list.show_packed} onCheckedChange={saveList}>
			Show Packed
		</DropdownMenuCheckboxItem>
		<DropdownMenuCheckboxItem bind:checked={list.show_images} onCheckedChange={saveList}>
			Show Images
		</DropdownMenuCheckboxItem>
		<DropdownMenuCheckboxItem bind:checked={list.show_weights} onCheckedChange={saveList}>
			Show Weight
		</DropdownMenuCheckboxItem>
		<DropdownMenuCheckboxItem bind:checked={list.show_prices} onCheckedChange={saveList}>
			Show Prices
		</DropdownMenuCheckboxItem>
		<DropdownMenuSeparator />
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>Default unit of mass</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuRadioGroup bind:value={list.weight_unit} onValueChange={saveList}>
					{#each Object.values(ItemsWeightUnitOptions) as massUnit}
						<DropdownMenuRadioItem value={massUnit}>
							{massUnit}
						</DropdownMenuRadioItem>
					{/each}
				</DropdownMenuRadioGroup>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	</DropdownMenuContent>
</DropdownMenu>
