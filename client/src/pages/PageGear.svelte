<script lang="ts">
  import { Table } from "@/components/ui/table";
  import { useItems } from "@/hooks/useItem";
  import LayoutApp from "@/layouts/LayoutApp.svelte";

  $: items = useItems();

</script>

<LayoutApp pageTitle="Gear Catalog">
  <Table></Table>
</LayoutApp>
