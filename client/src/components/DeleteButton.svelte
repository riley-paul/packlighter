<script>
  export let onClick;
  export let name = "";

  function onClickConfirm() {
    const message =
      "Are you sure you want to delete " + (name ? `'${name}'` : "this") + "?";
    const confirmation = confirm(message);
    if (!confirmation) return;
    onClick();
  }
</script>

<button
  on:click={onClickConfirm}
  class="hover:bg-red-500 hover:text-white w-8 h-8 rounded-full transition-colors"
>
  <i class="fa-solid fa-trash text-base" />
</button>
