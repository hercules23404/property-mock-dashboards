
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  placeholder?: string;
  filtersContent?: React.ReactNode;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchFilters = ({ 
  placeholder = "Search...", 
  filtersContent,
  onSearch,
  className 
}: SearchFiltersProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={cn("flex flex-col md:flex-row gap-2", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 w-full"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      
      {filtersContent && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filtersContent}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export const DefaultFilterContent = () => {
  return (
    <>
      <DropdownMenuCheckboxItem checked>
        Most Recent
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>
        Oldest First
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>
        Priority: High to Low
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>
        Priority: Low to High
      </DropdownMenuCheckboxItem>
    </>
  );
};
