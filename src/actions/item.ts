import { pb } from "@/lib/pocketbase";
import { Collections, type ItemsRecord } from "@/lib/types";

const itemActions = {
  get: () => {
    return pb
      .collection(Collections.Items)
      .getFullList({ sort: "name", expand: "tags" });
  },
  update: (input: { id: string; item: Partial<ItemsRecord> }) => {
    return pb.collection(Collections.Items).update(input.id, input.item);
  },
  delete: (id: string) => {
    return pb.collection(Collections.Items).delete(id);
  },
  create: () => {
    return pb.collection(Collections.Items).create({
      user: pb.authStore.model?.id,
      weight: 0,
      weight_unit: "g",
      sort_order: 0,
    });
  },
  setImage: (variables: { id: string; image: Blob }) => {
    const formData = new FormData();
    formData.append("image", variables.image);
    return pb.collection(Collections.Items).update(variables.id, formData);
  },
  deleteImage: (id: string) => {
    return pb.collection(Collections.Items).update(id, { image: null });
  },
  reorder: (itemIds: string[]) =>
    Promise.all(
      itemIds.map((id, index) =>
        pb.collection(Collections.Items).update(id, { sort_order: index })
      )
    ),
};

export default itemActions;
