<script lang="ts">
  import type { PageData } from "./$types";

  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "$components/ui/card";

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$components/ui/table";
  import { Checkbox } from "$components/ui/checkbox";

  export let data: PageData;
  console.log(data);
</script>

<div class="flex-1">
  <CardHeader>
    <CardTitle class={data.list.name ? "" : "text-muted-foreground"}>
      {data.list.name || "Unnamed List"}
    </CardTitle>
    <CardDescription
      class={data.list.description ? "" : "text-muted-foreground"}
    >
      {data.list.description || "Description"}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Table class="w-full">
      <TableHeader>
        <TableRow>
          <TableHead class="w-8 text-base text-foreground" colspan="4" />
          <TableHead class="w-8">Weight</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each data.listItems as item}
          <TableRow>
            <TableCell class="text-center">
              <Checkbox bind:value={item.packed} />
            </TableCell>
            <TableCell class="w-[100px]">
              <img src={item.expand.item.image_url} alt="" />
            </TableCell>
            <TableCell>{item.expand.item.name}</TableCell>
            <TableCell class="text-muted-foreground">
              {item.expand.item.description}
            </TableCell>
            <TableCell class="text-center">
              {item.expand.item.weight_g}
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </CardContent>
</div>
