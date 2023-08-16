<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { resetPasswordSchema } from "$lib/config/schemas";
  import { AlertTriangle, ThumbsUp } from "lucide-svelte";

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
  import { slide } from "svelte/transition";
  export let data;

  const { form, errors, enhance, delayed } = superForm(data.form, {
    taintedMessage: null,
    validators: resetPasswordSchema,
    delayMs: 0,
  });
</script>

<form method="POST" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <div transition:slide>
      <Alert variant="destructive">
        <AlertTriangle class="h-4 w-4" />
        <AlertTitle>Password Reset Problem</AlertTitle>
        <AlertDescription>{$errors._errors}</AlertDescription>
      </Alert>
    </div>
  {/if}
  <Card>
    <CardHeader
      ><CardTitle>Password Reset</CardTitle>
      <CardDescription>
        Enter your email and you will be sent a link to reset your password if
        an account matching that email exists
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email address"
        autocomplete="email"
        data-invalid={$errors.email}
        bind:value={$form.email}
      />
      {#if $errors.email}
        <small class="text-destructive">{$errors.email}</small>
      {/if}
    </CardContent>
    <CardFooter class="grid space-y-1">
      {#if $delayed}
        <ButtonLoading />
      {:else}
        <Button type="submit">Send Email</Button>
      {/if}
    </CardFooter>
  </Card>
</form>
