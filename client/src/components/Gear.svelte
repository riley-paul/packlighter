<script lang="ts">
  import { pb } from "../lib/pocketbase";

  export let item;

  async function removeFromList(id) {
    await pb.collection("categories");
  }
</script>

<tr class="border-t hover:bg-gray-50">
  <td class="w-[100px]">
    <img src={item.image_url} alt="" />
  </td>
  <td class="w-1/6">{item.name}</td>
  <td class="text-gray-500">{item.description}</td>
  <td class="text-center">{item.weight_g}</td>
  <td class="text-center">{1}</td>
</tr>
