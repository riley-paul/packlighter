import { pb } from '@/lib/pocketbase';
import { createMutation } from '@tanstack/svelte-query';
import { type ExpandedCategory, type ListWithCategories } from './useList';
import { isCategoryFullyPacked, isItemUntouched } from '@/lib/helpers';
import { queryClient } from '../../../native-app/src/lib/query';
import { Collections } from '@/lib/types';
import { page } from '$app/stores';

export const useUpdateCategory = () =>
	createMutation({
		mutationFn: (variables: { id: string; category: Partial<ExpandedCategory> }) =>
			pb.collection(Collections.ListCategories).update(variables.id, variables.category),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
			})
	});

export const useDeleteCategory = () =>
	createMutation({
		mutationFn: (category: ExpandedCategory) =>
			Promise.all([
				pb.collection(Collections.ListCategories).delete(category.id),
				...category.items
					.filter(isItemUntouched)
					.map((i) => pb.collection(Collections.Items).delete(i.itemData.id))
			]),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useCreateCategory = () =>
	createMutation({
		mutationFn: (listId: string) => {
			const currentCategories =
				queryClient.getQueryData<ListWithCategories>([Collections.Lists, listId])?.categories ?? [];
			const maxSortOrder = Math.max(...currentCategories.map((c) => c.sort_order));

			return pb.collection(Collections.ListCategories).create({
				list: listId,
				sort_order: maxSortOrder + 1
			});
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
			})
	});

export const useToggleCategoryPacked = () =>
	createMutation({
		mutationFn: (category: ExpandedCategory) => {
			const isFullyPacked = isCategoryFullyPacked(category);
			return Promise.all(
				category.items.map((i) =>
					pb.collection(Collections.CategoriesItems).update(i.id, { packed: !isFullyPacked })
				)
			);
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
			})
	});

export const useUpdateCategoriesOrder = () =>
	createMutation({
		mutationFn: (variables: { categoryIds: string[] }) =>
			Promise.all(
				variables.categoryIds.map((id, index) =>
					pb.collection(Collections.ListCategories).update(id, { sort_order: index })
				)
			),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
			})
	});
