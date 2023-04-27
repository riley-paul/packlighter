<script lang="ts">
  import CreateButton from "$lib/components/buttons/CreateButton.svelte";
  import type { PageData } from "./$types";

  import Category from "$lib/components/Category.svelte";
  import Gear from "$lib/components/Category.svelte";
  import UpdateableText from "$lib/components/buttons/UpdateableText.svelte";

  export let data: PageData;
  console.log(data);
</script>

{#if !data.list}
  Could not find that list
{:else}
  <UpdateableText
    value={data.list.name}
    action="?/updateList"
    name="name"
    classes="flex-1 text-orange-500 text-3xl font-bold"
    placeholder="List Name"
  />
  <UpdateableText
    value={data.list.description}
    action="?/updateList"
    name="description"
    classes="text-gray-700"
    placeholder="List Description"
  />
  <br />
  <div class="flex flex-col gap-4">
    {#each data.list.categories as category (category.id)}
      <Category {category}>
        {#each category.gear as gear (gear.id)}
          <Gear {gear} />
        {/each}
      </Category>
    {/each}
    <CreateButton action="?/addCategory" entity="category" />
  </div>
{/if}
