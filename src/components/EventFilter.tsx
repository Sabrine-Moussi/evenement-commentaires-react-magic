
import { useState } from "react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: Category) => void;
  categories: Category[];
  selectedCategory: Category;
}

const EventFilter = ({
  onSearchChange,
  onCategoryChange,
  categories,
  selectedCategory,
}: EventFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un événement..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      <div>
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value as Category)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EventFilter;
