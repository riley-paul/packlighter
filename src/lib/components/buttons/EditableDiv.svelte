<script lang="ts">
  export let content: string;
  export let classes: string = "";
  export let placeholder: string = "";
  export let handleBlur: () => Promise<void> = () => Promise.resolve();
  export let handleFocus: () => Promise<void> = () => Promise.resolve();

  function handleKeypress(event: KeyboardEvent) {
    let pressedKey = event.key;
    let targetElement = event.target as HTMLDivElement;

    switch (pressedKey) {
      case "Escape":
        targetElement.blur();
        break;
      case "Enter":
        targetElement.blur();
        break;
    }
  }
</script>

<div
  contenteditable="true"
  class="bg-inherit cursor-text focus:bg-gray-50 focus:text-gray-900 {classes}"
  bind:textContent={content}
  data-ph={placeholder}
  on:blur={handleBlur}
  on:focus={handleFocus}
  on:keypress={handleKeypress}
/>

<style>
  [contenteditable="true"]:empty:not(:focus):before {
    content: attr(data-ph);
    color: grey;
  }
</style>
