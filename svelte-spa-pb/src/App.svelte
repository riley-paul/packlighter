<script lang="ts">
  import { Button } from "@/components/ui/button";
  import { routes } from "./lib/routes";
  import Router, { replace } from "svelte-spa-router";

  import { ModeWatcher } from "mode-watcher";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  const queryClient = new QueryClient();

  const redirectAuth = () => replace("/auth");
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
  <Router {routes} on:conditionsFailed={redirectAuth} />
</QueryClientProvider>
