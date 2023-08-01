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
          <TableHead>Packed</TableHead>
          <TableHead class="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Weight</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each data.items as item}
          <TableRow>
            <TableCell class="text-center w-8">
              <Checkbox bind:value={item.packed} />
            </TableCell>
            <TableCell>
              <img src={item.expand.item.image_url} alt="" />
            </TableCell>
            <TableCell>{item.expand.item.name}</TableCell>
            <TableCell>{item.expand.item.description}</TableCell>
            <TableCell class="text-center w-8">{item.expand.item.weight_g}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </CardContent>
</div>
