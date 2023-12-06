<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { pb } from "@/lib/pocketbase";
  import { AlertTriangle } from "lucide-svelte";
  import type { ClientResponseError } from "pocketbase";

  type Schema = { email: string; password: string };
  type PbValidationError = { message: string; code: string };

  let data: Schema = {
    email: "",
    password: "",
  };

  let error: {
    identity?: PbValidationError;
    password?: PbValidationError;
    overall?: string;
  } = {};

  const submitForm = (data: Schema) =>
    pb
      .collection("users")
      .authWithPassword(data.email, data.password)
      .then((res) => {
        console.log("login successful");
        window.location.href = "/";
      })
      .catch((err: ClientResponseError) => {
        console.log(err.data);
        error = { ...error, ...err.data.data };
        error.overall = err.data.message;
      });
</script>

<form on:submit|preventDefault={() => submitForm(data)}>
  {#if error.overall}
    <Alert variant="destructive" class="mb-2">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.overall}</AlertDescription>
    </Alert>
  {/if}
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials</CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <Input
        placeholder="Email"
        type="email"
        name="email"
        bind:value={data.email}
      />
      {#if error.identity}
        <span class="text-xs text-destructive">{error.identity.message}</span>
      {/if}
      <Input
        placeholder="Password"
        type="password"
        name="password"
        bind:value={data.password}
      />
      {#if error.password}
        <span class="text-xs text-destructive">{error.password.message}</span>
      {/if}
    </CardContent>
    <CardFooter>
      <Button type="submit" class="w-full">Submit</Button>
    </CardFooter>
  </Card>
</form>
