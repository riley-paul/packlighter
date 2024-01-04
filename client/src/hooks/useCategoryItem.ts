import { createMutation } from '@tanstack/svelte-query';
import {
	type ListWithCategories,
	type ExpandedCategory,
	type ExpandedCategoryItem
} from './useList';
import { pb } from '@/lib/pocketbase';
import { getSortOrderFromIndex, isItemUntouched } from '@/lib/helpers';

import { queryClient } from '@/lib/query';
import { Collections, type ItemsResponse } from '@/lib/types';
import { page } from '$app/stores';

export const useUpdateCategoryItem = () =>
	createMutation({
		mutationFn: (variables: { id: string; categoryItem: Partial<ExpandedCategoryItem> }) => {
			const { categoryItem } = variables;
			const p1 = pb
				.collection(Collections.CategoriesItems)
				.update(variables.id || '', variables.categoryItem);
			const p2 = categoryItem.item
				? pb.collection(Collections.Items).update(categoryItem.item, categoryItem.itemData)
				: Promise.resolve();
			return Promise.all([p1, p2]);
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useDeleteCategoryItem = () =>
	createMutation({
		mutationFn: (categoryItem: ExpandedCategoryItem) =>
			Promise.all([
				pb.collection(Collections.CategoriesItems).delete(categoryItem.id),
				isItemUntouched(categoryItem)
					? pb.collection(Collections.Items).delete(categoryItem.itemData.id)
					: Promise.resolve()
			]),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useCreateCategoryItem = () =>
	createMutation({
		mutationFn: (variables: {
			category: ExpandedCategory;
			listId: string;
			itemId?: string;
			insertionIndex?: number;
		}) => {
			const maxSortOrder = Math.max(...variables.category.items.map((i) => i.sort_order));
			const sort_order =
				variables.insertionIndex !== undefined
					? getSortOrderFromIndex(
							variables.category.items.map((i) => i.sort_order),
							variables.insertionIndex
						)
					: maxSortOrder + 1;

			// adding existing item to category
			if (variables.itemId)
				return pb.collection(Collections.CategoriesItems).create({
					category: variables.category.id,
					item: variables.itemId,
					quantity: 1,
					sort_order
				});

			const currentList = queryClient.getQueryData<ListWithCategories>([
				Collections.Lists,
				variables.listId
			]);

			// adding new item to category
			return pb
				.collection(Collections.Items)
				.create({
					user: pb.authStore.model?.id,
					weight: 0,
					weight_unit: currentList?.weight_unit ?? 'g',
					sort_order: queryClient.getQueryData<ItemsResponse[]>([Collections.Items])?.length ?? 0
				})
				.then((item) =>
					pb.collection(Collections.CategoriesItems).create({
						category: variables.category.id,
						item: item.id,
						quantity: 1,
						sort_order
					})
				);
		},
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Items] });
			})
	});

export const useUpdateCategoryItemsOrder = () =>
	createMutation({
		mutationFn: (variables: { categoryItemIds: string[]; categoryId: string }) =>
			Promise.all(
				variables.categoryItemIds.map((id, index) =>
					pb
						.collection(Collections.CategoriesItems)
						.update(id, { sort_order: index, category: variables.categoryId })
				)
			),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
			})
	});
