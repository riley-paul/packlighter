import { pb } from '$lib/pocketbase';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const { id = '' } = params;
	const list = await pb.collection('lists').getOne(id);
	return { list };
};
