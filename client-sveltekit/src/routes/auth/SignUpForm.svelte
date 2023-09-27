<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { signUpSchema } from "$lib/config/schemas";
  import { AlertTriangle, Loader2 } from "lucide-svelte";

  import { Button } from "$components/ui/button";
  import { Alert, AlertDescription, AlertTitle } from "$components/ui/alert";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";
  import { Checkbox } from "$components/ui/checkbox";
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

  const { form, errors, enhance, delayed } = superForm(data.signUpForm, {
    taintedMessage: null,
    validators: signUpSchema,
    delayMs: 0,
  });
</script>

<form method="POST" action="/auth/sign-up" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <div transition:slide>
      <Alert variant="destructive">
        <AlertTriangle class="h-4 w-4" />
        <AlertTitle>Sign Up Issue</AlertTitle>
        <AlertDescription>{$errors._errors}</AlertDescription>
      </Alert>
    </div>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="name">Name</Label>
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
          <small class="text-destructive">{$errors.email}</small>
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
          <small class="text-destructive">{$errors.password}</small>
        {/if}
      </div>
      <div class="space-y-1">
        <Label for="passwordConfirm">Confirm Password</Label>
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
      <div class="flex items-center space-x-2 pt-4">
        <Checkbox id="terms" bind:checked={$form.terms} />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept the
          <a href="/terms" class="text-primaryHover underline">terms</a>
          and
          <a href="/privacy" class="text-primaryHover underline"
            >privacy policy</a
          >
        </label>
      </div>
    </CardContent>
    <CardFooter class="grid space-y-1">
      {#if $delayed}
        <ButtonLoading />
      {:else}
        <Button disabled={!$form.terms} type="submit">Sign Up</Button>
      {/if}
    </CardFooter>
  </Card>
</form>
