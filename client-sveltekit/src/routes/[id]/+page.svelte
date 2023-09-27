<script lang="ts">
  import { Button } from "$components/ui/button";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  const { list } = data;
</script>

<h2>{list.name}</h2>

<form
  method="POST"
  action="?/delete"
  on:submit={() => confirm("Are you sure you want to delete this?")}
>
  <Button type="submit">Delete</Button>
</form>
