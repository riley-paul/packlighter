<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { userSchema } from "$lib/config/zod-schemas";
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
  import OrSeparator from "$components/OrSeparator.svelte";

  export let data: PageServerData;

  const signUpSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const { form, errors, enhance, delayed } = superForm(data.form, {
    taintedMessage: null,
    validators: signUpSchema,
    delayMs: 0,
  });

  let termsAccept = false;
  // $: termsValue = $form.terms as Writable<boolean>;
</script>

<form method="POST" action="/auth/sign-up" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <Alert>
      <AlertTriangle class="h-4 w-4" />
      <AlertTitle>Sign Up Issue</AlertTitle>
      <AlertDescription>{$errors._errors}</AlertDescription>
    </Alert>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>Please create an account</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          autocomplete="given-name"
          data-invalid={$errors.firstName}
          bind:value={$form.firstName}
        />
        {#if $errors.firstName}
          <small>{$errors.firstName}</small>
        {/if}
      </div>
      <div class="space-y-1">
        <Label for="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          autocomplete="family-name"
          data-invalid={$errors.lastName}
          bind:value={$form.lastName}
        />
        {#if $errors.lastName}
          <small>{$errors.lastName}</small>
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
      <div class="flex items-center space-x-2 pt-4">
        <Checkbox id="terms" bind:checked={termsAccept} />
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
        <Button disabled={!termsAccept} type="submit">Sign Up</Button>
      {/if}
      <OrSeparator />
      <Button variant="secondary" href="/auth/sign-in">Sign In</Button>
    </CardFooter>
  </Card>
</form>
