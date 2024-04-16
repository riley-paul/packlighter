import { pb } from "@/lib/pocketbase";
import { Collections } from "@/lib/types";
import useAppStore from "@/store";
import { zItemsLists } from "@/store/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function Root(): ReturnType<React.FC> {
  const dataQuery = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const id: string = pb.authStore.model?.id;
      const { data } = await pb.collection(Collections.Users).getOne(id);
      const parsed = zItemsLists.safeParse(data);
      

      
      return pb.authStore.model?.data;
    },
  });

  const toastId = React.useRef<string | number | undefined>();
  const dataMutation = useMutation({
    mutationFn: () => {
      const data = useAppStore.getState();
      const userId = pb.authStore.model?.id ?? "";
      return pb.collection(Collections.Users).update(userId, { data });
    },
    onMutate: () => {
      toastId.current = toast.loading("Saving data...");
    },
    onSuccess: () => {
      toast.success("Data saved successfully", { id: toastId.current });
    },
    onError: () => {
      toast.error("Failed to save data", { id: toastId.current });
    },
    onSettled: () => {
      toast.dismiss(toastId.current);
    },
  });

  return (
    <main className="h-[100svh] flex overflow-hidden">
      <Outlet />
    </main>
  );
}
