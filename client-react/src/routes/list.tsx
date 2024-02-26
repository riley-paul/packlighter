import { getList } from "@/api/list";
import { Collections } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();

  const listQuery = useQuery({
    queryKey: [Collections.Lists, listId],
    queryFn: ({ queryKey }) => getList(queryKey[1]),
    onSuccess: (data) => console.log(data),
  });

  if (listQuery.isLoading) return <div>Loading...</div>;

  if (listQuery.isError) return <div>Error</div>;

  return <div>{listQuery.data?.name}</div>;
}
