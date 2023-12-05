import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ListList } from "./ListList";
import { useParams } from "react-router-dom";
import { ListChecks } from "lucide-react";

export const ListListDrawer: React.FC = () => {
  const { listId } = useParams();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(false);
  }, [listId]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button>
          <ListChecks className="h-4 w-4 mr-2" />
          Lists
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetClose asChild>
          <ListList />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
