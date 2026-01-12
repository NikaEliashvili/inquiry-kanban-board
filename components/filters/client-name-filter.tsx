import { useFiltersStore } from "@/store/filters-store";
import { Search } from "lucide-react";
import React from "react";

const ClientNameFilter = () => {
  const { clientName, updateClientName } = useFiltersStore();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="search"
        className="text-sm text-muted-foreground font-medium"
      >
        Client Name
      </label>

      <div className="relative">
        <Search className="size-4 absolute left-3 top-0 bottom-0 my-auto text-muted-foreground" />
        <input
          id="search"
          type="text"
          className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-base placeholder:text-muted-foreground md:text-sm pl-9 bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          placeholder="Search by client name..."
          value={clientName}
          onChange={(e) => updateClientName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClientNameFilter;
