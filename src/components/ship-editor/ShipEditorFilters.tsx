
import React, { useState } from 'react';
import { useShipEditor } from "@/contexts/ShipEditorContext";
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
import { Filter, Shield, Zap, Package, Search } from "lucide-react";

const ShipEditorFilters = () => {
  const { setFilter, setSort, setSearchText, editorState } = useShipEditor();
  const [searchValue, setSearchValue] = useState(editorState.searchText || "");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(searchValue);
  };
  
  return (
    <div className="space-y-2">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-1 items-center">
        <Label className="mr-1 text-xs"><Filter size={14} className="inline mr-1" /> Filtr:</Label>
        <div className="flex gap-1 flex-wrap">
          <Button 
            size="sm" 
            variant={!editorState.filterType ? "default" : "outline"}
            onClick={() => setFilter(undefined)}
            className="text-xs py-1 h-auto"
          >
            Vše
          </Button>
          <Button 
            size="sm" 
            variant={editorState.filterType === 'Weapon' ? "default" : "outline"}
            onClick={() => setFilter('Weapon')}
            className="text-xs py-1 h-auto"
          >
            <Zap size={12} className="mr-1" />
            Zbraně
          </Button>
          <Button 
            size="sm" 
            variant={editorState.filterType === 'Defense' ? "default" : "outline"}
            onClick={() => setFilter('Defense')}
            className="text-xs py-1 h-auto"
          >
            <Shield size={12} className="mr-1" />
            Obrana
          </Button>
          <Button 
            size="sm" 
            variant={editorState.filterType === 'System' ? "default" : "outline"}
            onClick={() => setFilter('System')}
            className="text-xs py-1 h-auto"
          >
            <Package size={12} className="mr-1" />
            Systémy
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {/* Sort dropdown */}
        <div className="flex items-center">
          <Label htmlFor="sort-select" className="mr-2 text-xs">Třídit dle:</Label>
          <Select 
            onValueChange={(value) => setSort(value)}
            defaultValue={editorState.sortKey || "Name_AZ"}
          >
            <SelectTrigger className="w-[140px] h-7 text-xs" id="sort-select">
              <SelectValue placeholder="Název A-Z" />
            </SelectTrigger>
            <SelectContent className="bg-space-dark border-space-buttons-border text-space-ui-text">
              <SelectItem value="Name_AZ" className="text-xs">Název A-Z</SelectItem>
              <SelectItem value="Type" className="text-xs">Typ</SelectItem>
              <SelectItem value="Value_Desc" className="text-xs">Hodnota ▼</SelectItem>
              <SelectItem value="Value_Asc" className="text-xs">Hodnota ▲</SelectItem>
              <SelectItem value="PowerConsumption_Desc" className="text-xs">Energie ▼</SelectItem>
              <SelectItem value="PowerConsumption_Asc" className="text-xs">Energie ▲</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Search field */}
        <div>
          <form onSubmit={handleSearch} className="flex items-center">
            <Input 
              type="text" 
              placeholder="Hledat modul..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-7 text-xs w-32 bg-space-dark border-space-buttons-border"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7"
            >
              <Search size={14} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipEditorFilters;
