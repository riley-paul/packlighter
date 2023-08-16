<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { userSchema } from "$lib/config/zod-schemas";
  import { AlertTriangle, ThumbsUp } from "lucide-svelte";

  export let data: PageServerData;

  import Header from "$components/Header.svelte";

  const signUpSchema = userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
  });

  const { form, errors, enhance, delayed, message } = superForm(data.form, {
    taintedMessage: null,
    validators: signUpSchema,
    delayMs: 0,
  });

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
  import type { PageServerData } from "../app/profile/$types";
</script>

<Header>Account Information</Header>
<div class="w-full h-full flex justify-center pt-12">
  <form method="POST" use:enhance class="space-y-2 max-w-md w-full p-4">
    <!--<SuperDebug data={$form} />-->
    {#if $message}
      <Alert>
        <ThumbsUp class="h-4 w-4" />
        <AlertTitle>{$message}</AlertTitle>
      </Alert>
    {/if}
    {#if $errors._errors}
      <Alert>
        <AlertTriangle class="h-4 w-4" />
        <AlertTitle>Sign In Issue</AlertTitle>
        <AlertDescription>{$errors._errors}</AlertDescription>
      </Alert>
    {/if}
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Modify your account</CardDescription>
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
        <Button href="/auth/password/reset" class="w-full" variant="link">
          Change Password
        </Button>
      </CardContent>
      <CardFooter class="grid space-y-1">
        {#if $delayed}
          <ButtonLoading />
        {:else}
          <Button type="submit">Update</Button>
        {/if}
      </CardFooter>
    </Card>
  </form>
</div>
