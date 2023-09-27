<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Feather, User } from "lucide-svelte";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  export let data: LayoutData;
</script>

<nav class="flex items-center justify-between px-4 h-16 border-b">
  <a href="/" class="font-medium text-lg">
    <h1 class="flex gap-2 items-center">
      <Feather class="text-teal-500" />PackLighter
    </h1>
  </a>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Avatar.Root>
        <Avatar.Image src={data.avatarImageUrl} alt="@shadcn" />
        <Avatar.Fallback><User /></Avatar.Fallback>
      </Avatar.Root>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Account</DropdownMenu.Item>
        <form action="?/logout">
          <DropdownMenu.Item>
            <Button type="submit">Logout</Button>
          </DropdownMenu.Item>
        </form>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</nav>
<main class="p-4 overflow-auto">
  <slot />
</main>
