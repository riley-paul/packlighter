import { pb } from '@/lib/pocketbase';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import type { ClientResponseError } from 'pocketbase';
import { queryClient } from '@/lib/query';
import { Collections, type ItemsRecord, type ItemsResponse } from '@/lib/types';
import { page } from '$app/stores';

export const useItems = () =>
	createQuery<ItemsResponse[], ClientResponseError>({
		queryKey: [Collections.Items],
		queryFn: () => pb.collection(Collections.Items).getFullList({ sort: 'sort_order' })
	});

export const useUpdateItem = () =>
	createMutation({
		mutationFn: (variables: { id: string; item: Partial<ItemsRecord> }) =>
			pb.collection(Collections.Items).update(variables.id, variables.item),

		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useDeleteItem = () =>
	createMutation({
		mutationFn: (id: string) => pb.collection(Collections.Items).delete(id),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useSetItemImage = () =>
	createMutation({
		mutationFn: (variables: { id: string; image: Blob }) => {
			const formData = new FormData();
			formData.append('image', variables.image);
			return pb.collection(Collections.Items).update(variables.id, formData);
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useDeleteItemImage = () =>
	createMutation({
		mutationFn: (id: string) => pb.collection(Collections.Items).update(id, { image: null }),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useUpdateItemsOrder = () =>
	createMutation({
		mutationFn: (variables: { itemIds: string[] }) =>
			Promise.all(
				variables.itemIds.map((id, index) =>
					pb.collection(Collections.Items).update(id, { sort_order: index })
				)
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [Collections.Items] })
	});
