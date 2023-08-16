<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { userSchema } from "$lib/config/zod-schemas";
  import { AlertTriangle } from "lucide-svelte";
  import { Loader2 } from "lucide-svelte";

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
  export let data;
  const resetPasswordSchema = userSchema.pick({ email: true });
  const { form, errors, enhance, delayed } = superForm(data.form, {
    taintedMessage: null,
    validators: resetPasswordSchema,
    delayMs: 0,
  });
</script>

<form method="POST" use:enhance class="space-y-2">
  <!--<SuperDebug data={$form} />-->
  {#if $errors._errors}
    <Alert>
      <AlertTriangle class="h-4 w-4" />
      <AlertTitle>Password Reset Problem</AlertTitle>
      <AlertDescription>{$errors._errors}</AlertDescription>
    </Alert>
  {/if}
  <Card>
    <CardHeader
      ><CardTitle>Password Reset</CardTitle>
      <CardDescription>
        Enter your email and you will be sent a link to reset your password
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
        <small>{$errors.email}</small>
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
