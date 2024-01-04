<script lang="ts">
  import type { ListWithCategories } from "@/hooks/useList";
  import { getCategoryWeight } from "@/lib/helpers";
  import Chart, {
    type ChartConfiguration,
    type ChartData,
  } from "chart.js/auto";
  import { onMount } from "svelte";

  export let list: ListWithCategories;

  let canvas: HTMLCanvasElement;

  let data: ChartData;
  $: data = {
    labels: list.categories.map((category) => category.name),
    datasets: [
      {
        label: list.name,
        data: list.categories.map((category) =>
          getCategoryWeight(category, list.weight_unit),
        ),
        hoverOffset: 4,
      },
    ],
  };

  let config: ChartConfiguration;
  $: config = {
    type: "doughnut",
    data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, config);
  });
</script>

<div class="h-52 w-52">
  <canvas bind:this={canvas}></canvas>
</div>
