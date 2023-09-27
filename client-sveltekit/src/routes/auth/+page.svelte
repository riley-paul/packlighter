<script lang="ts">
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "$components/ui/tabs";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  import LoginForm from "./LoginForm.svelte";
  import SignUpForm from "./SignUpForm.svelte";
</script>

<Tabs value="login" class="max-w-md mx-auto">
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
