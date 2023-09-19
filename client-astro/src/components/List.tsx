import { cn } from "@/lib/utils";
import type { Record } from "pocketbase";
import { Button } from "./ui/button";
import { Share, Trash, Trash2 } from "lucide-react";

interface Props {
  list: Record;
}

export const List: React.FC<Props> = ({ list }) => {
  return (
    <div className="flex justify-between">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className={cn("text-teal-500", { "opacity-50": !list.name })}>
          {list.name || "Unnamed List"}
        </h1>
        <p className={cn({ "opacity-50": !list.name })}>
          {list.description || "Description"}
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <form
          action={`/api/lists/${list.id}/delete`}
          method="post"
          onSubmit={() => confirm("Are you sure you want to delete this list?")}
        >
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </form>
        <Button variant="secondary" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};