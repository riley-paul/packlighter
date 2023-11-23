<script lang="ts">
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$components/ui/tabs";
  import { Feather } from "lucide-svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  import LoginForm from "./LoginForm.svelte";
  import SignUpForm from "./SignUpForm.svelte";
</script>

<div class="container max-w-sm">
  <div class="flex flex-col py-8 items-center">
    <Feather class="h-16 w-16 text-teal-500 mb-4" />
    <h1 class="text-3xl font-bold mb-1">PackLighter</h1>
    <p class="text-sm text-muted-foreground">The packing tool of champions</p>
  </div>

  <Tabs value="login">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="login">Login</TabsTrigger>
      <TabsTrigger value="signup">Sign Up</TabsTrigger>
    </TabsList>
    <TabsContent value="login">
      <LoginForm {data} />
    </TabsContent>
    <TabsContent value="signup">
      <SignUpForm {data} />
    </TabsContent>
  </Tabs>
</div>
