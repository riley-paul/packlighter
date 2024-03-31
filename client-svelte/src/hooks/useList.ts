import { pb } from '@/lib/pocketbase';
import { createMutation, createQuery } from '@tanstack/svelte-query';
import type { ClientResponseError } from 'pocketbase';

import {
	type CategoriesItemsResponse,
	type ListCategoriesResponse,
	type ItemsResponse,
	type ListsResponse,
	Collections
} from '@/lib/types';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { queryClient } from '@/lib/query';

const CATEGORY_ITEM_EXPAND_KEY = 'categories_items(category)';

type CategoriesItemsExpandItem = CategoriesItemsResponse<{
	item: ItemsResponse;
}>;

type CategoriesExpandCategoriesItems = ListCategoriesResponse<{
	[CATEGORY_ITEM_EXPAND_KEY]: CategoriesItemsExpandItem[];
}>;

export type ExpandedCategoryItem = CategoriesItemsExpandItem & {
	itemData: ItemsResponse;
};

export type ExpandedCategory = CategoriesExpandCategoriesItems & {
	items: ExpandedCategoryItem[];
};

export type ListWithCategories = ListsResponse & {
	categories: ExpandedCategory[];
};

const expandItems = (record: CategoriesItemsExpandItem): ExpandedCategoryItem => ({
	...record,
	itemData: record.expand?.item ?? ({} as ItemsResponse)
});

const expandCategory = (record: CategoriesExpandCategoriesItems): ExpandedCategory => ({
	...record,
	items:
		record.expand?.[CATEGORY_ITEM_EXPAND_KEY]?.map(expandItems).sort(
			(a: ExpandedCategoryItem, b: ExpandedCategoryItem) => a.sort_order - b.sort_order
		) ?? []
});

export const useList = (listId: string) =>
	createQuery<ListWithCategories, ClientResponseError>({
		queryKey: [Collections.Lists, listId],
		queryFn: async () => {
			const [list, categories] = await Promise.all([
				pb.collection(Collections.Lists).getOne(listId ?? '', { requestKey: null }),
				pb
					.collection(Collections.ListCategories)
					.getFullList<CategoriesExpandCategoriesItems>({
						filter: `list = "${listId}"`,
						sort: 'sort_order',
						expand: 'categories_items(category).item'
					})
					.then((data) => data.map(expandCategory))
			]);
			return { ...list, categories };
		}
	});

export const useLists = () =>
	createQuery<ListsResponse[], ClientResponseError>({
		queryKey: [Collections.Lists],
		queryFn: () => pb.collection(Collections.Lists).getFullList({ sort: 'sort_order' })
	});

export const useCreateList = () =>
	createMutation({
		mutationFn: () => {
			const currentLists = queryClient.getQueryData<ListsResponse[]>([Collections.Lists]);
			const maxSortOrder = Math.max(...(currentLists?.map((list) => list.sort_order) ?? [0]));

			return pb.collection(Collections.Lists).create({
				user: pb.authStore.model?.id,
				sort_order: maxSortOrder + 1,
				weight_unit: 'g'
			});
		},
		onSuccess: (data) => {
			goto(`/${data.id}`);
			queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
		}
	});

export const useRemoveList = () =>
	createMutation({
		mutationFn: (id: string) => pb.collection(Collections.Lists).delete(id),
		onSuccess: (_, variables) =>
			page.subscribe(({ params: { listId } }) => {
				if (listId === variables) goto('/');
				queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
			})
	});

export const useUpdateList = () =>
	createMutation({
		mutationFn: (variables: { id: string; list: Partial<ListWithCategories> }) =>
			pb.collection(Collections.Lists).update(variables.id, variables.list),
		onSuccess: () =>
			page.subscribe(({ params: { listId } }) => {
				queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
				queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
			})
	});

export const useUpdateListsOrder = () =>
	createMutation({
		mutationFn: (variables: { listIds: string[] }) =>
			Promise.all(
				variables.listIds.map((id, index) =>
					pb.collection(Collections.Lists).update(id, { sort_order: index })
				)
			),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [Collections.Lists] })
	});
