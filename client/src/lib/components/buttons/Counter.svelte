<script lang="ts">
  export let value: number;
  export let onChange: () => Promise<void>;

  export let min = 1;
</script>

<div class="flex justify-between w-full px-4">
  <button
    on:click={() => {
      if (value <= min) return;
      value -= 1;
      onChange();
    }}
  >
    ◀︎
  </button>
  <span>{value}</span>
  <button
    on:click={() => {
      value += 1;
      onChange();
    }}
  >
    ▶︎
  </button>
</div>
