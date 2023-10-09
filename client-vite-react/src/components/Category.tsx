import { Grabber } from "@/components/Grabber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType, ItemType, ListItemType } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Delete } from "lucide-react";
import { ItemPicker } from "./ItemPicker";
import { ItemImage } from "./ItemImage";
import { ItemParams } from "./ItemParams";
import { Separator } from "./ui/separator";
import { CategoryMenu } from "./CategoryMenu";

type ListItemWithItem = ListItemType & { item: ItemType };

interface Props {
  listId: string;
  category: CategoryType;
}

export const Category: React.FC<Props> = (props) => {
  const { category, listId } = props;

  const { getItem, updateCategory, removeListItem } = useAppStore((state) => ({
    getItem: state.getItem,
    updateCategory: state.updateCategory,
    removeListItem: state.removeListItem,
  }));

  const categoryItems: ListItemWithItem[] = category.items
    .map((i) => ({ ...i, item: getItem(i.itemId) }))
    .filter((i): i is ListItemWithItem => i.item !== undefined);

  return (
    <div className="grid">
      <div className="flex items-center gap-2 border-b-2 pb-2">
        <Grabber />
        <Input
          type="text"
          value={category.name}
          placeholder="Unnamed Category"
          className="text-md flex-1 border-none px-2 py-0 h-8 font-medium hover:bg-muted transition-colors"
          onChange={(e) =>
            updateCategory(listId, category.id, { name: e.target.value })
          }
        />
        <ItemPicker listId={listId} categoryId={category.id} />
        <CategoryMenu listId={listId} category={category} />
      </div>
      {categoryItems.length > 0 ? (
        categoryItems.map((listItem) => (
          <div key={listItem.id} className="hover:bg-muted/50">
            <div className="flex gap-2 p-2 h-full">
              <ItemImage item={listItem.item} />
              <ItemParams item={listItem.item} />
              <Button
                size="icon"
                variant="ghost"
                className="h-full w-6"
                onClick={() => removeListItem(listId, category.id, listItem.id)}
              >
                <Delete className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
          </div>
        ))
      ) : (
        <div className="p-2 text-sm text-muted-foreground">No items yet</div>
      )}
    </div>
  );
};
