<script>
  export let open;
  export let classes = "";
</script>

<button
  class="flex items-center justify-between {classes}"
  on:click={() => (open = !open)}
>
  <slot />
  <div class="px-2 h-auto">
    <i
      class="aspect-square fa-regular {!open
        ? 'fa-square-plus'
        : 'fa-square-minus'}"
    />
  </div>
</button>
