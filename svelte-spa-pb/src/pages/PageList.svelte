<script lang="ts">
  import LayoutApp from "@/layouts/LayoutApp.svelte";

  export let params = { listId: "" };
</script>

<LayoutApp>
  {JSON.stringify(params)}
</LayoutApp>
