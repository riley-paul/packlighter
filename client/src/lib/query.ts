import { QueryClient, createMutation } from '@tanstack/svelte-query';
import { pb } from './pocketbase';
import { Collections } from './types';
import { zSchema } from './schema';
import { toast } from 'svelte-sonner';

export const queryClient = new QueryClient();

export const initSchemaMutation = createMutation({
	mutationFn: (userId: string) => {
		const currentSchema = pb.authStore.model?.schema ?? {};
		return pb.collection(Collections.Users).update(userId, {
			schema: zSchema.parse(currentSchema)
		});
	},
	onSuccess: () => toast.success('Schema initialized'),
	onError: (err) => {
		toast.error('Error initializing schema');
		console.log(err);
	}
});
