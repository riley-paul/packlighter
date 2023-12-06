<script lang="ts">
  import { cn } from "@/lib/utils";
  import { Delete, Plus } from "lucide-svelte";
  import { Button } from "./ui/button";

  import { pb } from "@/lib/pocketbase";
  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import { link, push as goto, location } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

  const queryClient = useQueryClient();
  const listsQuery = useQuery("lists", () =>
    pb.collection("lists").getFullList({ sort: "-created" })
  );

  const createList = useMutation(
    () => pb.collection("lists").create({ user: pb.authStore.model?.id }),
    {
      onSuccess: (data) => {
        goto(`/${data.id}`);
        queryClient.invalidateQueries("lists");
      },
    }
  );

  const removeList = useMutation(
    (id: string) => pb.collection("lists").delete(id),
    {
      onSuccess: (data, variables) => {
        if ($location.includes(variables)) goto("/");
        queryClient.invalidateQueries("lists");
      },
    }
  );
</script>

<div class="flex items-center justify-between">
  <h2 class="text-sm font-medium">Lists</h2>
  <Button size="sm" variant="ghost" on:click={() => $createList.mutate()}>
    <Plus class="mr-2 w-4" /> New List
  </Button>
</div>
<div class="overflow-auto">
  {#each $listsQuery.data ?? [] as list}
    <a
      use:link
      use:active={{
        path: `/${list.id}`,
        className: "border-l-4 border-primary pl-3 text-foreground",
      }}
      href={`/${list.id}`}
      class={cn(
        "w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between",
        !list.name && "italic"
      )}
    >
      {list.name || "Unnamed List"}
      <Button
        size="icon"
        variant="ghost"
        class="h-8 w-8 opacity-0 group-hover:opacity-100"
        on:click={() => $removeList.mutate(list.id)}
      >
        <Delete class="h-4 w-4" />
      </Button>
    </a>
  {/each}
</div>
