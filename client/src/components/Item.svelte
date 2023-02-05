<script lang="ts">
  export let item;
</script>

<div class="bg-red-500">
  <img src={item.image_url} alt="" />
</div>
<div>{item.name}</div>
<div class="text-gray-500">{item.description}</div>
<div class="text-center">{item.weight_g}</div>
<div class="text-center">{1}</div>
