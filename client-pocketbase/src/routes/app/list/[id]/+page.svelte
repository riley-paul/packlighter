<script lang="ts">
  import type { PageData } from "./$types";

  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "$components/ui/card";

  export let data: PageData;
  console.log(data);
</script>

<CardHeader>
  <CardTitle class={data.list.name ? "" : "text-muted-foreground"}>
    {data.list.name || "Unnamed List"}
  </CardTitle>
  <CardDescription class={data.list.description ? "" : "text-muted-foreground"}>
    {data.list.description || "Description"}
  </CardDescription>
</CardHeader>
