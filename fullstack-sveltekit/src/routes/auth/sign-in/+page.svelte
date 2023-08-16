<script lang="ts">
  import OrSeparator from "$components/OrSeparator.svelte";

  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { userSchema } from "$lib/config/zod-schemas";

  import { AlertTriangle } from "lucide-svelte";

  import { Button } from "$components/ui/button";
  import { Alert, AlertDescription, AlertTitle } from "$components/ui/alert";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import ButtonLoading from "$components/ButtonLoading.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const signInSchema = userSchema.pick({ email: true, password: true });

  const { form, errors, enhance, delayed } = superForm(data.form, {
    taintedMessage: null,
    validators: signInSchema,
    delayMs: 0,
  });
</script>

<form method="POST" action="/auth/sign-in" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <Alert>
      <AlertTriangle class="h-4 w-4" />
      <AlertTitle>Sign In Issue</AlertTitle>
      <AlertDescription>{$errors._errors}</AlertDescription>
    </Alert>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
      <CardDescription>Please enter your credentials</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          data-invalid={$errors.email}
          bind:value={$form.email}
        />
        {#if $errors.email}
          <small>{$errors.email}</small>
        {/if}
      </div>
      <div class="space-y-1">
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          data-invalid={$errors.password}
          bind:value={$form.password}
        />
        {#if $errors.password}
          <small>{$errors.password}</small>
        {/if}
      </div>
      <div class="grid">
        <Button href="/auth/password/reset" variant="link"
          >Forgot Password?</Button
        >
      </div>
    </CardContent>
    <CardFooter class="grid space-y-1">
      {#if $delayed}
        <ButtonLoading />
      {:else}
        <Button type="submit">Sign In</Button>
      {/if}
      <OrSeparator />
      <Button variant="secondary" href="/auth/sign-up">Sign Up</Button>
    </CardFooter>
  </Card>
</form>
