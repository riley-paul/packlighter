import { pb } from "@/lib/pocketbase";
import { Collections, type ItemsRecord } from "@/lib/types";

export const getItems = () =>
  pb
    .collection(Collections.Items)
    .getFullList({ sort: "name", expand: "tags" });

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

export const updateItemsOrder = (itemIds: string[]) =>
  Promise.all(
    itemIds.map((id, index) =>
      pb.collection(Collections.Items).update(id, { sort_order: index })
    )
  );
