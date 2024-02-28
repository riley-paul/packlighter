import { getItems } from "@/api/item";
import { Collections } from "@/lib/types";
import React from "react";
import { useQuery } from "react-query";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import Loader from "./base/loader";
import { Button } from "./ui/button";
import { Table } from "lucide-react";
import PackingItem from "./packing-item";

const PackingItems: React.FC = () => {
  const itemsQuery = useQuery({
    queryKey: [Collections.Items],
    queryFn: getItems,
  });

  return (
    <div className="p-4 flex flex-col gap-2 h-full flex-1 overflow-hidden">
      <header className="flex gap-2 flex-col">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-sm">Gear</span>
          <Button size="sm" variant="linkMuted">
            <Table size="1rem" className="mr-2" />
            All Gear
          </Button>
        </div>
        <Input placeholder="Filter gear..." className="bg-card" />
      </header>
      <Card className="flex-1 h-full overflow-y-auto">
        {itemsQuery.isLoading && <Loader />}
        {itemsQuery.data?.map((item) => (
          <PackingItem key={item.id} item={item} />
        ))}
      </Card>
    </div>
  );
};

export default PackingItems;
