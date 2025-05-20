
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpaceBackground from '@/components/game/SpaceBackground';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import CategoryList from '@/components/knowledge/CategoryList';
import EntryList from '@/components/knowledge/EntryList';
import EntryDetailView from '@/components/knowledge/EntryDetailView';
import { useCodex } from '@/contexts/CodexContext';

const KnowledgeLibraryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { searchEntries } = useCodex();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchEntries(searchText);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
      {/* Background */}
      <SpaceBackground />
      
      {/* Close button */}
      <Button 
        variant="outline" 
        className="absolute top-4 right-4 z-30 border-space-buttons-border bg-space-dark/80"
        onClick={() => navigate(-1)}
      >
        <X size={20} />
      </Button>
      
      {/* Overlay with title */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark/80 to-transparent z-10 pointer-events-none">
        <h1 className="font-pixel text-3xl text-space-ui-text text-center mt-8">KNIHOVNA ZNALOSTÍ</h1>
      </div>
      
      {/* Knowledge Library interface */}
      <div className="relative z-20 w-11/12 h-[85%] mx-auto mt-20 grid grid-cols-12 gap-4">
        {/* Search bar */}
        <div className="col-span-12 mb-2">
          <form onSubmit={handleSearch} className="flex">
            <Input 
              className="bg-space-dark/70 border border-space-buttons-border text-space-ui-text placeholder:text-space-ui-subtext"
              placeholder="Hledat v knihovně znalostí..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost"
              className="border border-space-buttons-border ml-2"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>
        
        {/* Category list */}
        <div className="col-span-2 bg-space-dark/70 border border-space-buttons-border rounded">
          <ScrollArea className="h-full">
            <div className="p-2">
              <h2 className="font-pixel text-space-ui-text text-lg mb-3">Kategorie</h2>
              <CategoryList />
            </div>
          </ScrollArea>
        </div>
        
        {/* Entry list */}
        <div className="col-span-3 bg-space-dark/70 border border-space-buttons-border rounded">
          <ScrollArea className="h-full">
            <div className="p-2">
              <h2 className="font-pixel text-space-ui-text text-lg mb-3">Záznamy</h2>
              <EntryList />
            </div>
          </ScrollArea>
        </div>
        
        {/* Entry detail view */}
        <div className="col-span-7 bg-space-dark/70 border border-space-buttons-border rounded">
          <ScrollArea className="h-full">
            <div className="p-4">
              <EntryDetailView />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeLibraryScreen;
