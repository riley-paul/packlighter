<script lang="ts">
  export let show = false;

  function handleKeypress(event: KeyboardEvent) {
    let pressedKey = event.key;

    switch (pressedKey) {
      case "Escape":
        show = false;
        break;
    }
  }
</script>

{#if show}
  <div
    class="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-700/80 flex items-center justify-center"
    on:click={() => (show = false)}
    on:keypress={handleKeypress}
  >
    <div
      class="bg-slate-700 p-4"
      on:click|stopPropagation
      on:keypress|stopPropagation
    >
      <slot />
    </div>
  </div>
{/if}
