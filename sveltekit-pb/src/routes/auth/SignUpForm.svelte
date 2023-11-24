<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  //import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { signUpSchema } from "$lib/config/schemas";
  import { AlertTriangle, Loader2, LogIn } from "lucide-svelte";
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import type { PageServerData } from "./$types";
  import { slide } from "svelte/transition";
  import * as Alert from "$lib/components/ui/alert";
  import * as Form from "$components/ui/form";

  export let data: PageServerData;

  const { errors, delayed } = superForm(data.signUpForm, {
    taintedMessage: null,
    validators: signUpSchema,
    delayMs: 0,
  });
</script>

{#if $errors._errors}
  <div transition:slide class="mb-2">
    <Alert.Root variant="destructive">
      <AlertTriangle class="h-4 w-4" />
      <Alert.Title>Sign Up Issue</Alert.Title>
      <Alert.Description>{$errors._errors}</Alert.Description>
    </Alert.Root>
  </div>
{/if}
<Card>
  <Form.Root
    schema={signUpSchema}
    method="POST"
    form={data.signUpForm}
    action="?/signUp"
    let:config
  >
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>Create a new account</CardDescription>
    </CardHeader>
    <CardContent>
      <Form.Field {config} name="name">
        <Form.Item>
          <Form.Label>Name</Form.Label>
          <Form.Input
            type="text"
            placeholder="Edmund Hillary"
            autocomplete="given-name"
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="email">
        <Form.Item>
          <Form.Label>Email</Form.Label>
          <Form.Input
            type="email"
            placeholder="edmund_hillary@everest.com"
            autocomplete="email"
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="password">
        <Form.Item>
          <Form.Label>Password</Form.Label>
          <Form.Input
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="passwordConfirm">
        <Form.Item>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Input
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
    </CardContent>
    <CardFooter class="grid space-y-1">
      <Button type="submit">
        {#if $delayed}
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          Loading
        {:else}
          Sign Up
        {/if}
      </Button>
    </CardFooter>
  </Form.Root>
</Card>
