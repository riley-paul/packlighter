<script lang="ts">
  import { Button } from "@/components/ui/button";
  import { routes } from "./lib/routes";
  import Router, { replace } from "svelte-spa-router";

  import { ModeWatcher } from "mode-watcher";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { currentList } from "./lib/store";

  const queryClient = new QueryClient();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
  <Router
    {routes}
    restoreScrollState
    on:conditionsFailed={() => replace("/auth")}
    on:routeLoaded={(ev) => currentList.set(ev.detail.params?.listId || null)}
  />
</QueryClientProvider>
