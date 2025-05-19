
import React, { useState } from 'react';
import { useInventory } from "@/contexts/InventoryContext";
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
              onClick={() => setFilter(undefined)}
              className="text-xs py-1 h-auto"
            >
              Vše
            </Button>
            <Button 
              size="sm" 
              variant={inventory.filterType === 'item.type.resource' ? "default" : "outline"}
              onClick={() => setFilter('item.type.resource')}
              className="text-xs py-1 h-auto"
            >
              Suroviny
            </Button>
            <Button 
              size="sm" 
              variant={inventory.filterType === 'item.type.component' ? "default" : "outline"}
              onClick={() => setFilter('item.type.component')}
              className="text-xs py-1 h-auto"
            >
              Komponenty
            </Button>
            <Button 
              size="sm" 
              variant={inventory.filterType === 'item.type.ship_module' ? "default" : "outline"}
              onClick={() => setFilter('item.type.ship_module')}
              className="text-xs py-1 h-auto"
            >
              Moduly
            </Button>
            <Button 
              size="sm" 
              variant={inventory.filterType === 'item.type.quest_item' ? "default" : "outline"}
              onClick={() => setFilter('item.type.quest_item')}
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
            onValueChange={(value) => setSort(value)}
            defaultValue={inventory.sortKey || "Name_AZ"}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs" id="sort-select">
              <SelectValue placeholder="Název A-Z" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border text-space-ui-text">
              <SelectItem value="Name_AZ" className="text-xs">Název A-Z</SelectItem>
              <SelectItem value="Type" className="text-xs">Typ</SelectItem>
              <SelectItem value="Value_Desc" className="text-xs">Hodnota ▼</SelectItem>
              <SelectItem value="Value_Asc" className="text-xs">Hodnota ▲</SelectItem>
              <SelectItem value="Rarity_Desc" className="text-xs">Vzácnost ▼</SelectItem>
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
