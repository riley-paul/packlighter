<script lang="ts">
  import { pb } from "@/lib/pocketbase";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { User } from "lucide-svelte";
  import { Separator } from "@/components/ui/separator";
  import { Button } from "@/components/ui/button";
  import { push } from "svelte-spa-router";

  const user = pb.authStore.model;
  const imageUrl = user
    ? pb.files.getUrl(user, user.avatar, { thumb: "100x100" })
    : "";
</script>

<Sheet>
  <SheetTrigger>
    <div
      class="flex cursor-pointer items-center text-sm underline-offset-4 hover:underline"
    >
      <Avatar class="h-10 w-10">
        <AvatarImage src={imageUrl} alt="@shadcn" />
        <AvatarFallback>
          <User class="h-8" />
        </AvatarFallback>
      </Avatar>
    </div>
  </SheetTrigger>
  <SheetContent class="flex flex-col">
    {#if user}
      <div class="flex gap-4">
        <Avatar class="h-20 w-20">
          <AvatarImage src={imageUrl} alt="@shadcn" />
          <AvatarFallback>
            <User class="h-8" />
          </AvatarFallback>
        </Avatar>
        <div class="flex flex-col justify-center">
          <h2 class="text-lg font-semibold">{user.name}</h2>
          <p class="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Separator class="my-4" />
      <div class="flex-1"></div>
      <Button
        type="submit"
        class="w-full"
        on:click={() => {
          pb.authStore.clear();
          push("/auth");
        }}
      >
        Logout
      </Button>
    {:else}
      Not logged in
    {/if}
  </SheetContent>
</Sheet>
