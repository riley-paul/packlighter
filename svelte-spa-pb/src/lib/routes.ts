import PageHome from "@/pages/PageHome.svelte";
import PageList from "@/pages/PageList.svelte";

export const routes = {
  "/": PageHome,
  "/:listId": PageList,
};
