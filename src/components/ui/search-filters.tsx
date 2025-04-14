
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SearchFiltersProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  filtersContent?: ReactNode;
  className?: string;
}

export const SearchFilters = ({
  placeholder = "Search...",
  onSearch,
  filtersContent,
  className,
}: SearchFiltersProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-2", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-9"
          onChange={(e) => onSearch?.(e.target.value)}
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
            {filtersContent}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export const DefaultFilterContent = () => (
  <>
    <div className="p-2">
      <div className="mb-2 text-sm font-medium">Status</div>
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" defaultChecked />
          <span>All</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Active</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span>Pending</span>
        </label>
      </div>
      
      <div className="mt-4 mb-2 text-sm font-medium">Date</div>
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2">
          <input type="radio" name="date" defaultChecked />
          <span>All time</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="date" />
          <span>Last 7 days</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="date" />
          <span>Last 30 days</span>
        </label>
      </div>
    </div>
  </>
);
