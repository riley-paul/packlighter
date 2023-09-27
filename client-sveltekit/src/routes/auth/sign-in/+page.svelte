<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
  import { signInSchema } from "$lib/config/schemas";

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
  import ButtonLoading from "$lib/components/ButtonLoading.svelte";
  import type { PageServerData } from "./$types";
  import { slide } from "svelte/transition";

  export let data: PageServerData;

  const { form, errors, enhance, delayed } = superForm(data.form, {
    taintedMessage: null,
    validators: signInSchema,
    delayMs: 0,
  });
</script>

<form method="POST" action="/auth/sign-in" use:enhance class="space-y-2">
  <!-- <SuperDebug data={$form} /> -->
  {#if $errors._errors}
    <div transition:slide>
      <Alert variant="destructive">
        <AlertTriangle class="h-4 w-4" />
        <AlertTitle>Sign In Issue</AlertTitle>
        <AlertDescription>{$errors._errors}</AlertDescription>
      </Alert>
    </div>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
      <CardDescription
        >Or <a class="text-sky-500 hover:underline" href="/auth/sign-up"
          >sign up</a
        > if you do not already have an account</CardDescription
      >
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
        <a
          href="/auth/reset-password"
          class="text-xs hover:underline text-sky-500">Forgot Password?</a
        >
        {#if $errors.password}
          <small>{$errors.password}</small>
        {/if}
      </div>
    </CardContent>
    <CardFooter class="grid space-y-1">
      {#if $delayed}
        <ButtonLoading />
      {:else}
        <Button type="submit">Sign In</Button>
      {/if}
    </CardFooter>
  </Card>
</form>
