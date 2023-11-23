<script lang="ts">
  import { Button } from "$components/ui/button";
  import { LogOut, User, Wrench } from "lucide-svelte";

  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  export let avatar: string;
  export let name: string;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Avatar.Root>
      <Avatar.Image src={avatar} alt="@shadcn" class="object-cover" />
      <Avatar.Fallback><User /></Avatar.Fallback>
    </Avatar.Root>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>{name}</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <form class="grid" method="post">
        <Button href="/account" variant="ghost" class="justify-start">
          <Wrench class="h-4 w-4 mr-2" />
          Account
        </Button>
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
