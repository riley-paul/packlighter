import { createList, deleteList, getLists } from "@/api/list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { Copy, Delete, MoreHorizontal, Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export default function PackingLists(): ReturnType<React.FC> {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(Collections.Lists);
      if (variables === listId) {
        navigate("/");
      }
    },
  });

  if (listsQuery.isLoading) return <div>Loading...</div>;

  if (listsQuery.isError) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-2">
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
      <Card className="py-2 max-h-[30vh] overflow-y-auto">
        {listsQuery.data?.map((list) => (
          <div
            className={cn(
              "flex items-center pr-2 pl-4 hover:border-l-4 hover:pl-3 py-0.5",
              pathname === `/list/${list.id}` &&
                "border-l-4 pl-3 border-primary text-primary-foreground bg-secondary"
            )}
            key={list.id}
          >
            <Link
              to={`/list/${list.id}`}
              className={cn(
                "flex-1",
                !list.name && "italic text-muted-foreground"
              )}
            >
              {list.name || "Unnamed List"}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => deleteListMutation.mutate(list.id)}
                >
                  Delete List
                  <DropdownMenuShortcut>
                    <Delete size="1rem" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled
                  onClick={() => deleteListMutation.mutate(list.id)}
                >
                  Duplicate List
                  <DropdownMenuShortcut>
                    <Copy size="1rem" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </Card>
    </div>
  );
}
