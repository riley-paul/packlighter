import React from "react";
import { cn } from "@/lib/utils";
import type { Record } from "pocketbase";
import { Button } from "./ui/button";
import { Share, Trash, Trash2 } from "lucide-react";
import { EditableDiv } from "./EditableDiv";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useToast } from "./ui/use-toast";

interface Props {
  list: Record;
}

export const List: React.FC<Props> = ({ list }) => {
  const { data } = useFetch("/api/items");
  const { toast } = useToast();
  console.log(data);

  return (
    <>
      <h2
        contentEditable
        content={list.name}
        className="h-auto text-xl text-teal-500"
        placeholder="List Name"
        onBlur={(e) =>
          fetch(`/api/lists/${list.id}`, {
            method: "PUT",
            body: JSON.stringify({ name: e.target.value }),
          })
            .then((response) => {
              if (!response.ok) throw response;
            })
            .catch((err) => {
              toast({ title: "Could not update list" });
              console.error(err);
            })
        }
      >
        {list.name}
      </h2>
      <Textarea
        defaultValue={list.description}
        className="h-auto wrap text-muted-foreground mt-2"
        placeholder="List Description"
        onBlur={(e) =>
          fetch(`/api/lists/${list.id}`, {
            method: "PUT",
            body: JSON.stringify({ description: e.target.value }),
          })
            .then((response) => {
              if (!response.ok) throw response;
            })
            .catch((err) => {
              toast({ title: "Could not update list" });
              console.error(err);
            })
        }
      />
      
      {/* <h2
        contentEditable
        className={cn("text-teal-500 font-medium text-xl mb-4", {
          "opacity-50": !list.name,
        })}
      >
        {list.name || "Unnamed List"}
      </h2>
      <p
        contentEditable
        className={cn("text-muted-foreground text-sm", {
          "opacity-50": !list.name,
        })}
      >
        {list.description || "Description"}
      </p> */}

      <form
        className="flex justify-center mt-2"
        action={`/api/lists/${list.id}/delete`}
        onSubmit={() => confirm("Are you sure you want to delete?")}
        method="post"
      >
        <Button variant="destructive" className="w-full">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </form>
    </>
  );
};
