<script lang="ts">
  import { routes } from "./lib/routes";
  import Router, { replace } from "svelte-spa-router";

  import { ModeWatcher } from "mode-watcher";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { currentList } from "./lib/store";

  import { queryClient } from "@/lib/query";
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
