<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';

	import { Sheet, SheetContent, SheetTrigger } from '../../../sveltekit-spa-pb/src/components/ui/sheet';
	import { Avatar, AvatarFallback, AvatarImage } from '../../../sveltekit-spa-pb/src/components/ui/avatar';
	import { User } from 'lucide-svelte';
	import { Separator } from '../../../sveltekit-spa-pb/src/components/ui/separator';
	import { Button } from '../../../sveltekit-spa-pb/src/components/ui/button';
	const user = pb.authStore.model as RecordModel;
	const imageUrl = pb.files.getUrl(user, user.avatar, { thumb: '100x100' });
</script>

<Sheet>
	<SheetTrigger>
		<div class="flex text-sm items-center hover:underline underline-offset-4 cursor-pointer">
			<Avatar class="h-10 w-10">
				<AvatarImage src={imageUrl} alt="@shadcn" />
				<AvatarFallback>
					<User class="h-8" />
				</AvatarFallback>
			</Avatar>
		</div>
	</SheetTrigger>
	<SheetContent class="flex flex-col">
		<div class="flex gap-4">
			<Avatar class="h-20 w-20">
				<AvatarImage src={imageUrl} alt="@shadcn" />
				<AvatarFallback>
					<User class="h-8" />
				</AvatarFallback>
			</Avatar>
			<div class="flex flex-col justify-center">
				<h2 class="font-semibold text-lg">{user.name}</h2>
				<p class="text-muted-foreground text-sm">{user.email}</p>
			</div>
		</div>
		<Separator class="my-4" />
		<div class="flex-1"></div>
		<Button
			type="submit"
			class="w-full"
			on:click={() => {
				pb.authStore.clear();
				window.location.href = '/auth';
			}}
		>
			Logout
		</Button>
	</SheetContent>
</Sheet>
