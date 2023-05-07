<script lang="ts">
  export let onClick: () => Promise<void>;
  export let name = "";
  export let askConfirm = true;

  function onClickConfirm() {
    const message =
      "Are you sure you want to delete " + (name ? `'${name}'` : "this") + "?";
    const confirmation = confirm(message);
    if (!confirmation) return;
    onClick();
  }
</script>

<button
  on:click={askConfirm ? onClickConfirm : onClick}
  class="hover:bg-orange-500 hover:text-white w-8 h-8 rounded-full text-gray-500 transition-colors"
>
  <i class="fa-solid fa-trash text-base" />
</button>
