<script lang="ts">
  import CreateButton from "./buttons/CreateButton.svelte";
  import DeleteButton from "./buttons/DeleteButton.svelte";
  import EditableDiv from "./buttons/EditableDiv.svelte";
  import UpdateableText from "./buttons/UpdateableText.svelte";

  import type { ListCategory } from "@prisma/client";

  export let category: ListCategory;
</script>

<table class="table-fixed border-b-2">
  <thead class="border-b-2">
    <tr>
      <th colspan="6" class="text-left text-lg">
        <UpdateableText
          action={`/${category.listId}?/updateListCategory`}
          value={category.name}
          name="name"
          auxiliaryData={{ categoryId: category.id }}
          placeholder="Category Name"
        />
      </th>
      <th class="w-1/12">Weight</th>
      <th class="w-1/12">Qty</th>
      <th class="w-10">
        <div class="hide">
          <DeleteButton action="" itemId={category.id} name={category.name} />
        </div>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y">
    <slot />
  </tbody>
</table>
<CreateButton action="" entity="item" />
