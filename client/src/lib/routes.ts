import PageAuth from "@/pages/PageAuth.svelte";
import PageHome from "@/pages/PageHome.svelte";
import PageList from "@/pages/PageList.svelte";
import { wrap } from "svelte-spa-router/wrap";
import { pb } from "./pocketbase";
import type { SvelteComponent } from "svelte";
import PageGear from "@/pages/PageGear.svelte";

export const routes = {
  "/auth": PageAuth,
  "/gear": wrap({
    component: PageGear as typeof SvelteComponent,
    conditions: [() => pb.authStore.isValid],
  }),
  "/:listId": wrap({
    component: PageList as typeof SvelteComponent,
    conditions: [() => pb.authStore.isValid],
  }),
  "/": wrap({
    component: PageHome as typeof SvelteComponent,
    conditions: [() => pb.authStore.isValid],
  }),
};
