import { pb } from '@/lib/pocketbase';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import type { ClientResponseError } from 'pocketbase';
import { Collections, type ItemsRecord, type ItemsResponse } from '@/lib/types';
import { page } from '$app/stores';
import { toast } from 'svelte-sonner';
import { queryClient } from '@/lib/query';

export const useItems = () =>
	createQuery<ItemsResponse[], ClientResponseError>({
		queryKey: [Collections.Items],
		queryFn: () =>
			pb.collection(Collections.Items).getFullList({ sort: 'sort_order', expand: 'tags' })
	});

export const useUpdateItem = () =>
	createMutation({
		mutationFn: (variables: { id: string; item: Partial<ItemsRecord> }) =>
			pb.collection(Collections.Items).update(variables.id, variables.item),

		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			}),
		onError: (error) => toast.error(error.message)
	});

export const useDeleteItem = () =>
	createMutation({
		mutationFn: (id: string) => pb.collection(Collections.Items).delete(id),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			}),
		onError: (error) => toast.error(error.message)
	});

export const useCreateItem = () =>
	createMutation({
		mutationFn: () =>
			pb
				.collection(Collections.Items)
				.create({ user: pb.authStore.model?.id, weight: 0, weight_unit: 'g', sort_order: 0 }),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			}),
		onError: (error) => toast.error(error.message)
	});

export const useSetItemImage = () =>
	createMutation<ItemsResponse, ClientResponseError, { id: string; image: Blob }>({
		mutationFn: (variables) => {
			const formData = new FormData();
			formData.append('image', variables.image);
			return pb.collection(Collections.Items).update(variables.id, formData);
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			}),
		onError: (error) => toast.error(error.response.data.image.message)
	});

export const useDeleteItemImage = () =>
	createMutation({
		mutationFn: (id: string) => pb.collection(Collections.Items).update(id, { image: null }),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			}),
		onError: (error) => toast.error(error.message)
	});

export const useUpdateItemsOrder = () =>
	createMutation({
		mutationFn: (variables: { itemIds: string[] }) =>
			Promise.all(
				variables.itemIds.map((id, index) =>
					pb.collection(Collections.Items).update(id, { sort_order: index })
				)
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [Collections.Items] }),
		onError: (error) => toast.error(error.message)
	});
