import { createList, getLists } from "@/api/list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import PackingList from "./packing-list";
import Loader from "./base/loader";

export default function PackingLists(): ReturnType<React.FC> {
  const navigate = useNavigate();

  const listsQuery = useQuery({
    queryKey: [Collections.Lists],
    queryFn: getLists,
  });

  const newListMutation = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      queryClient.invalidateQueries(Collections.Lists);
      navigate(`/list/${data.id}`);
    },
  });

  return (
    <div className="flex flex-col flex-1 gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-sm">Lists</span>
        <Button
          size="sm"
          variant="linkMuted"
          onClick={() => newListMutation.mutate()}
        >
          <Plus size="1rem" className="mr-2" />
          Add List
        </Button>
      </header>
      <Card className="py-2 max-h-[30vh] h-full overflow-y-auto">
        {listsQuery.isLoading && <Loader />}
        {listsQuery.isError && <div>Error</div>}
        {listsQuery.data?.map((list) => (
          <PackingList key={list.id} list={list} />
        ))}
      </Card>
    </div>
  );
}
