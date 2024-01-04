<script lang="ts">
  import type { ListWithCategories } from "@/hooks/useList";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../components/ui/table";
  import {
    formatWeight,
    getCategoryWeight,
    getItemWeightInUnit,
  } from "@/lib/helpers";
  export let list: ListWithCategories;
</script>

<Table class="w-52 text-xs">
  <TableHeader>
    <TableRow>
      <TableHead class="h-8">Category</TableHead>
      <TableHead class="h-8 text-right">Weight</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each list.categories as category}
      <TableRow>
        <TableCell>{category.name}</TableCell>
        <TableCell class="text-right">
          {formatWeight(getCategoryWeight(category, list.weight_unit))}
          {list.weight_unit}
        </TableCell>
      </TableRow>
    {/each}
    <TableRow class="font-bold">
      <TableCell class="border-t-2">Total</TableCell>
      <TableCell class="border-t-2 text-right">
        {formatWeight(
          list.categories.reduce(
            (acc, val) => acc + getCategoryWeight(val, list.weight_unit),
            0,
          ),
        )}
        {list.weight_unit}
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
