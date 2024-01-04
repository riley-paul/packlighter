import { pb } from '@/lib/pocketbase';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';

export const load: LayoutLoad = () => {
	if (!pb.authStore.isValid) {
		pb.authStore.clear();
		goto('/auth');
	}
};
