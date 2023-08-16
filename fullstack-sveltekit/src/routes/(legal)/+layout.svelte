<script lang="ts">
  import Logo from "$components/Logo.svelte";
  import Card from "$components/ui/card/Card.svelte";
</script>

<div class="flex flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-2xl">
  <Card class="p-6 prose">
    <slot />
  </Card>
</div>

<style>
</style>
