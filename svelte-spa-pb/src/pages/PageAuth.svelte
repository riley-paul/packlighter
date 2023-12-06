<script>
  import LoginForm from "@/components/forms/LoginForm.svelte";
  import SignUpForm from "@/components/forms/SignUpForm.svelte";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import { Feather } from "lucide-svelte";
</script>

<div class="h-screen overflow-auto">
  <div class="container max-w-sm py-12">
    <div class="flex flex-col mb-8 items-center">
      <Feather class="h-16 w-16 text-primary mb-4" />
      <h1 class="text-3xl font-bold mb-1">PackLighter</h1>
      <p class="text-sm text-muted-foreground">The packing tool of champions</p>
    </div>
    <Tabs value="login">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  </div>
</div>
