
import React, { useState } from 'react';
import { useInventory } from "@/contexts/InventoryContext";
import { ItemType } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Package, Search } from "lucide-react";

const InventoryFilters = () => {
  const { setFilter, setSort, setSearchText, inventory } = useInventory();
  const [searchValue, setSearchValue] = useState(inventory.searchText || "");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(searchValue);
  };
  
  // Helper function to safely check filter type
  const isFilterType = (filterType: any, itemType: ItemType | null): boolean => {
    if (filterType === null && itemType === null) return true;
    if (typeof filterType === 'string' && filterType === itemType) return true;
    return false;
  };
  
  // Ensure that filter type is always a string or null
  const handleFilterClick = (filterType: ItemType | null) => {
    // Cast to string explicitly for type safety
    setFilter(filterType);
  };

  // Ensure that sort value is always a string
  const handleSortChange = (value: string) => {
    setSort(value);
  };
  
  return (
    <div className="bg-space-dark bg-opacity-80 border border-space-buttons-border rounded-lg p-3">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Filter buttons */}
        <div className="flex items-center">
          <Label className="mr-2 text-xs"><Filter size={14} className="inline mr-1" /> Filtr:</Label>
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant={!inventory.filterType ? "default" : "outline"}
              onClick={() => handleFilterClick(null)}
              className="text-xs py-1 h-auto"
            >
              Vše
            </Button>
            <Button 
              size="sm" 
              variant={isFilterType(inventory.filterType, ItemType.Resource) ? "default" : "outline"}
              onClick={() => handleFilterClick(ItemType.Resource)}
              className="text-xs py-1 h-auto"
            >
              Suroviny
            </Button>
            <Button 
              size="sm" 
              variant={isFilterType(inventory.filterType, ItemType.Component) ? "default" : "outline"}
              onClick={() => handleFilterClick(ItemType.Component)}
              className="text-xs py-1 h-auto"
            >
              Komponenty
            </Button>
            <Button 
              size="sm" 
              variant={isFilterType(inventory.filterType, ItemType.Module) ? "default" : "outline"}
              onClick={() => handleFilterClick(ItemType.Module)}
              className="text-xs py-1 h-auto"
            >
              Moduly
            </Button>
            <Button 
              size="sm" 
              variant={isFilterType(inventory.filterType, ItemType.Special) ? "default" : "outline"}
              onClick={() => handleFilterClick(ItemType.Special)}
              className="text-xs py-1 h-auto"
            >
              Misijní
            </Button>
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Sort dropdown */}
        <div className="flex items-center">
          <Label htmlFor="sort-select" className="mr-2 text-xs">Třídit dle:</Label>
          <Select 
            onValueChange={handleSortChange}
            defaultValue={typeof inventory.sortKey === 'string' ? inventory.sortKey : "name"}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs" id="sort-select">
              <SelectValue placeholder="Název A-Z" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border text-space-ui-text">
              <SelectItem value="name" className="text-xs">Název A-Z</SelectItem>
              <SelectItem value="type" className="text-xs">Typ</SelectItem>
              <SelectItem value="value_desc" className="text-xs">Hodnota ▼</SelectItem>
              <SelectItem value="value_asc" className="text-xs">Hodnota ▲</SelectItem>
              <SelectItem value="rarity_desc" className="text-xs">Vzácnost ▼</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Search field */}
        <div>
          <form onSubmit={handleSearch} className="flex items-center">
            <Input 
              type="text" 
              placeholder="Hledat..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-8 text-xs w-44 bg-space-dark border-space-buttons-border"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
            >
              <Search size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
