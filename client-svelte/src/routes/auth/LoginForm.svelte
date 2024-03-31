<script lang="ts">
	import { goto } from '$app/navigation';
	import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
	import { Button } from '@/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '@/components/ui/card';
	import { Input } from '@/components/ui/input';
	import { pb } from '@/lib/pocketbase';
	import { createMutation } from '@tanstack/svelte-query';
	import { AlertTriangle } from 'lucide-svelte';
	import type { ClientResponseError } from 'pocketbase';

	import { toast } from 'svelte-sonner';

	type LoginSchema = { email: string; password: string };
	type PbValidationError = { message: string; code: string };

	let data: LoginSchema = {
		email: '',
		password: ''
	};

	let error: {
		identity?: PbValidationError;
		password?: PbValidationError;
		overall?: string;
	} = {};

	const loginMutation = createMutation({
		mutationFn: (data: LoginSchema) =>
			pb.collection('users').authWithPassword(data.email, data.password),
		onSuccess: () => {
			toast.success('Login successful');
			goto('/');
		},
		onError: (err: ClientResponseError) => {
			console.error(err.data);
			toast.error('Login failed');
			error = { ...error, ...err.data.data };
			error.overall = err.data.message;
		}
	});
</script>

<form on:submit|preventDefault={() => $loginMutation.mutate(data)}>
	{#if error.overall}
		<Alert variant="destructive" class="mb-2">
			<AlertTriangle className="h-4 w-4 mr-2" />
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
			<Input placeholder="Email" type="email" name="email" bind:value={data.email} />
			{#if error.identity}
				<span class="text-destructive text-xs">{error.identity.message}</span>
			{/if}
			<Input placeholder="Password" type="password" name="password" bind:value={data.password} />
			{#if error.password}
				<span class="text-destructive text-xs">{error.password.message}</span>
			{/if}
		</CardContent>
		<CardFooter>
			<Button type="submit" class="w-full">Submit</Button>
		</CardFooter>
	</Card>
</form>
