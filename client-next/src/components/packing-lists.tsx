import { Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import PackingList from "./packing-list";

import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import db from "@/db/drizzle";
import { listsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export default async function PackingLists() {
  const { userId } = auth();

  if (!userId) return null;

  const lists = await db
    .select()
    .from(listsTable)
    .where(eq(listsTable.user, userId))
    .all();

  const createList = async () => {
    "use server";
    const list = await db.insert(listsTable).values({ user: userId }).run();
    console.log(list);
    toast.success("List created");
    revalidatePath("/list");
  };

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-sm">Lists</span>
        <Button size="sm" onClick={createList}>
          <Plus size="1rem" className="mr-2" />
          Add List
        </Button>
      </header>
      <Card
        className={cn(
          "py-2 h-full overflow-y-auto overflow-x-hidden transition-colors"
        )}
      >
        {lists.map((list) => (
          <PackingList key={list.id} list={list} />
        ))}
      </Card>
    </div>
  );
}
