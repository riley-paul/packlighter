import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import Loader from "../base/loader";
import { Button } from "../ui/button";
import { ArrowDownWideNarrow, Table } from "lucide-react";
import PackingItem from "./packing-item";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import Error from "../base/error";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Placeholder from "../base/placeholder";
import { getPaths } from "@/lib/utils";
import { CacheKeys } from "@/lib/query";
import { trpc } from "@/client";
import type { Item } from "@/db/schema";

enum SortOptions {
  Name = "Name",
  Description = "Description",
  Weight = "Weight",
}

const sortingFunction = (option: SortOptions) => {
  switch (option) {
    case SortOptions.Name:
      return (a: Item, b: Item) => {
        if (!a.name) return -1;
        if (!b.name) return 1;
        return a.name.localeCompare(b.name);
      };
    case SortOptions.Description:
      return (a: Item, b: Item) => {
        if (!a.description) return -1;
        if (!b.description) return 1;
        return a.description.localeCompare(b.description);
      };
    case SortOptions.Weight:
      return (a: Item, b: Item) => a.weight - b.weight;
    default:
      0;
  }
};

const filterItems = (item: Item, query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return (
    item.name?.toLowerCase().includes(lowerCaseQuery) ||
    item.description?.toLowerCase().includes(lowerCaseQuery)
  );
};

const PackingItems: React.FC = () => {
  const { toggleSidebar } = useStore();

  const itemsQuery = useQuery({
    queryKey: [CacheKeys.Items],
    queryFn: () => trpc.items.get.query(),
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sortOption, setSortOption] = React.useState<SortOptions>(
    SortOptions.Name
  );
  const [filterQuery, setFilterQuery] = React.useState("");

  return (
    <div className="p-4 flex flex-col gap-2 h-full flex-1 overflow-hidden">
      <header className="flex gap-2 flex-col">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-sm">Gear</span>
          <Button
            size="sm"
            variant={pathname === getPaths.gear() ? "secondary" : "linkMuted"}
            onClick={() => {
              navigate(getPaths.gear());
              toggleSidebar(false);
            }}
          >
            <Table size="1rem" className="mr-2" />
            All Gear
          </Button>
        </div>
        <div className="flex gap-1">
          <Input
            placeholder="Filter..."
            className="bg-card"
            value={filterQuery}
            onChange={(ev) => setFilterQuery(ev.target.value)}
          />
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ArrowDownWideNarrow size="1rem" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Sort Gear</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort Gear</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={(v) => setSortOption(v as SortOptions)}
              >
                {Object.values(SortOptions).map((option) => (
                  <DropdownMenuRadioItem key={option} value={option}>
                    {option}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <Card className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        {itemsQuery.isLoading && <Loader />}
        {itemsQuery.isError && <Error error={itemsQuery.error} />}
        {itemsQuery.isSuccess &&
          itemsQuery.data
            .filter((item) => filterItems(item, filterQuery))
            .sort(sortingFunction(sortOption))
            .map((item) => <PackingItem key={item.id} item={item} />)}
        {itemsQuery.isSuccess && itemsQuery.data.length === 0 && (
          <Placeholder message="No gear yet" />
        )}
      </Card>
    </div>
  );
};

export default PackingItems;
