
import React from 'react';
import { useCodex } from '@/contexts/CodexContext';
import { cn } from "@/lib/utils";

const EntryList: React.FC = () => {
  const { filteredEntries, selectedEntry, selectEntry } = useCodex();

  if (filteredEntries.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px] text-space-ui-subtext font-pixel">
        Žádné záznamy k zobrazení
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredEntries.map(entry => (
        <button 
          key={entry.entryId}
          onClick={() => selectEntry(entry.entryId)}
          className={cn(
            "w-full text-left p-2 rounded flex items-center transition-colors",
            selectedEntry === entry.entryId 
              ? "bg-space-buttons/80 border border-space-buttons-border" 
              : "bg-space-dark/60 hover:bg-space-dark/40 border border-transparent"
          )}
        >
          <span className="font-pixel text-sm text-space-ui-text truncate flex-grow">
            {entry.entryTitle}
          </span>
          {entry.isNew && (
            <div className="ml-2 text-yellow-400 font-pixel text-xs">NOVÉ</div>
          )}
        </button>
      ))}
    </div>
  );
};

export default EntryList;
