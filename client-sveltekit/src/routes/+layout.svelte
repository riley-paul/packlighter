<script lang="ts">
  import { Button } from "$components/ui/button";
  import { Feather, LogOut, User } from "lucide-svelte";
  import "../app.postcss";
  import type { LayoutData } from "./$types";

  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  export let data: LayoutData;
</script>

<svelte:head>
  <title>PackLighter</title>
  <meta name="description" content="Packing tool" />
</svelte:head>

<nav class="flex items-center justify-between px-4 h-16 border-b">
  <a href="/" class="font-medium text-lg">
    <h1 class="flex gap-2 items-center">
      <Feather class="text-teal-500" />PackLighter
    </h1>
  </a>

  {#if data.user}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar.Root>
          <Avatar.Image src={data.avatarImageUrl} alt="@shadcn" />
          <Avatar.Fallback><User /></Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <form class="grid" method="post">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Account</DropdownMenu.Item>
            <Button
              type="submit"
              variant="ghost"
              class="justify-start"
              formaction="/?/logout"
            >
              <LogOut class="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {/if}
</nav>
<main class="p-4 overflow-auto">
  <slot />
</main>

<SvelteToast />
