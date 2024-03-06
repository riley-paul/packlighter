import { pb } from "@/lib/pocketbase";
import type { ClientResponseError } from "pocketbase";
import { queryClient } from "@/lib/query";
import { Collections, type ItemsRecord, type ItemsResponse } from "@/lib/types";

export const getItems = () =>
  pb
    .collection(Collections.Items)
    .getFullList({ sort: "sort_order", expand: "tags" });

export const updateItem = (variables: {
  id: string;
  item: Partial<ItemsRecord>;
}) => pb.collection(Collections.Items).update(variables.id, variables.item);

export const deleteItem = (id: string) =>
  pb.collection(Collections.Items).delete(id);

export const createItem = () =>
  pb.collection(Collections.Items).create({
    user: pb.authStore.model?.id,
    weight: 0,
    weight_unit: "g",
    sort_order: 0,
  });

export const setItemImage = (variables: { id: string; image: Blob }) => {
  const formData = new FormData();
  formData.append("image", variables.image);
  return pb.collection(Collections.Items).update(variables.id, formData);
};

export const deleteItemImage = (id: string) =>
  pb.collection(Collections.Items).update(id, { image: null });

export const updateItemsOrder = (variables: { itemIds: string[] }) =>
  Promise.all(
    variables.itemIds.map((id, index) =>
      pb.collection(Collections.Items).update(id, { sort_order: index })
    )
  );
