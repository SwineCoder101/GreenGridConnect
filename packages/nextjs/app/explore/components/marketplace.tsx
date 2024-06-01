"use client";

import { useState } from "react";
import ProductModal from "./product-modal";
import { SelectItem } from "@radix-ui/react-select";
import { useDebounce } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Button } from "~~/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "~~/components/ui/select";
import { Product } from "~~/lib/random";
import { useGlobalState } from "~~/services/store/store";

enum SortOrder {
  Trending = "trending",
  RecentlyListed = "recently-listed",
  PriceLowToHigh = "price-low-to-high",
  PriceHighToLow = "price-high-to-low",
}
const displaySortOrder = (sortOrder: SortOrder): string => {
  switch (sortOrder) {
    case SortOrder.Trending:
      return "Trending";
    case SortOrder.RecentlyListed:
      return "Recently listed";
    case SortOrder.PriceLowToHigh:
      return "Price: low to high";
    case SortOrder.PriceHighToLow:
      return "Price: high to low";
  }
};
const sortFunction = (sortOrder: SortOrder): ((a: Product, b: Product) => number) => {
  switch (sortOrder) {
    case SortOrder.Trending:
      return (a, b) => b.inUse - a.inUse;
    case SortOrder.RecentlyListed:
      return (a, b) => b.createdAt.getTime() - a.createdAt.getTime();
    case SortOrder.PriceLowToHigh:
      return (a, b) => a.price - b.price;
    case SortOrder.PriceHighToLow:
      return (a, b) => b.price - a.price;
  }
};

const Marketplace = () => {
  const { products } = useGlobalState();
  const [sortOrder, setSortOrder] = useState(SortOrder.Trending);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4">
        <Button variant="secondary" className="font-semibold">
          <AdjustmentsHorizontalIcon className="w-3.5 h-3.5 mr-1" />
          Filters
        </Button>

        <div className="flex items-center space-x-2 rounded-xl px-3 py-1.5 bg-neutral-800 w-full h-10 focus-within:ring-2 focus-within:ring-neutral-600 hover:ring-2 hover:ring-neutral-600 duration-150 ease-in-out">
          <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-sm placeholder-neutral-600"
            placeholder="Search for energy providers"
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <Select defaultValue={SortOrder.Trending} onValueChange={value => setSortOrder(value as SortOrder)}>
          <SelectTrigger className="max-w-40 bg-secondary">
            <span className="font-semibold">{displaySortOrder(sortOrder)}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortOrder.Trending}>{displaySortOrder(SortOrder.Trending)}</SelectItem>
            <SelectItem value={SortOrder.RecentlyListed}>{displaySortOrder(SortOrder.RecentlyListed)}</SelectItem>
            <SelectItem value={SortOrder.PriceLowToHigh}>{displaySortOrder(SortOrder.PriceLowToHigh)}</SelectItem>
            <SelectItem value={SortOrder.PriceHighToLow}>{displaySortOrder(SortOrder.PriceHighToLow)}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {products
          .filter(p => `${p.name},${p.provider}`.includes(debouncedSearch))
          .sort(sortFunction(sortOrder))
          .map(product => (
            <ProductModal key={product.id} product={product}></ProductModal>
          ))}
      </div>
    </div>
  );
};

export default Marketplace;
