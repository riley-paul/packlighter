<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { signUpSchema } from "$lib/config/schemas";
  import { AlertTriangle, Loader2 } from "lucide-svelte";

  import { Button } from "$components/ui/button";
  import { Input } from "$components/ui/input";
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
  import { slide } from "svelte/transition";

  export let data: PageServerData;

  import * as Alert from "$lib/components/ui/alert";

  const { form, errors, enhance, delayed } = superForm(data.signUpForm, {
    taintedMessage: null,
    validators: signUpSchema,
    delayMs: 0,
  });
</script>

<form method="POST" action="?/signUp" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <div transition:slide>
      <Alert.Root variant="destructive">
        <AlertTriangle class="h-4 w-4" />
        <Alert.Title>Sign Up Issue</Alert.Title>
        <Alert.Description>{$errors._errors}</Alert.Description>
      </Alert.Root>
    </div>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>Create a new account</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          autocomplete="given-name"
          data-invalid={$errors.name}
          bind:value={$form.name}
        />
        {#if $errors.name}
          <small class="text-destructive">{$errors.name}</small>
        {/if}
      </div>
      <div class="space-y-1">
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
          <small class="text-destructive">{$errors.email}</small>
        {/if}
      </div>
      <div class="space-y-1">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          data-invalid={$errors.password}
          bind:value={$form.password}
        />
        {#if $errors.password}
          <small class="text-destructive">{$errors.password}</small>
        {/if}
      </div>
      <div class="space-y-1">
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          data-invalid={$errors.passwordConfirm}
          bind:value={$form.passwordConfirm}
        />
        {#if $errors.passwordConfirm}
          <small class="text-destructive">{$errors.passwordConfirm}</small>
        {/if}
      </div>
    </CardContent>
    <CardFooter class="grid space-y-1">
      {#if $delayed}
        <ButtonLoading />
      {:else}
        <Button type="submit">Sign Up</Button>
      {/if}
    </CardFooter>
  </Card>
</form>
