<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Plus } from "lucide-svelte";
  import type { PageServerData } from "./$types";
  import LinkList from "$components/LinkList.svelte";

  export let data: PageServerData;
  console.log(data)

  const listsLinks = data.lists.map((list) => ({
    link: `/${list.id}`,
    name: list.name,
    class: list.name ? "" : "opacity-50",
  }));
  const gearLinks = [{ name: "All Gear", link: "/gear" }];
</script>

<div class="flex justify-between items-center mb-2">
  <h2 class="text-lg font-medium">Lists</h2>
  <form action="?/createList" method="post">
    <Button variant="secondary" size="sm">
      <!-- <Plus className="mr-3" /> -->
      Add List
    </Button>
  </form>
</div>
<LinkList links={listsLinks} />
<br />
<h2 class="text-lg font-medium mb-2">Gear</h2>
<LinkList links={gearLinks} />
