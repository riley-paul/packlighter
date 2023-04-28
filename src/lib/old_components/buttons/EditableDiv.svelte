<script lang="ts">
  export let content = "Empty";
  export let classes = "";
  export let placeholder = ""
  export let handleBlur = () => undefined;
  export let handleFocus = () => undefined;

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
  data-ph={placeholder}
  bind:textContent={content}
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
