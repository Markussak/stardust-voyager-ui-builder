
import React from 'react';
import { useCodex } from '@/contexts/CodexContext';
import { useProceduralLore } from '@/contexts/ProceduralLoreContext';
import { Badge } from '@/components/ui/badge';

const EntryList: React.FC = () => {
  const { filteredEntries, selectedEntry, selectEntry } = useCodex();
  const { generatedLoreFragments, recentlyGeneratedLoreIds } = useProceduralLore();
  
  // Combine codex entries with procedural lore fragments
  const combinedEntries = [
    ...filteredEntries,
    ...generatedLoreFragments.map(fragment => ({
      entryId: fragment.id,
      entryTitle: fragment.title,
      categoryKey: 'PROCEDURAL_LORE',
      isUnlocked: true,
      isNew: recentlyGeneratedLoreIds.includes(fragment.id),
      isProceduralLore: true, // Flag to identify procedural lore entries
      contentElements: []
    }))
  ];
  
  if (combinedEntries.length === 0) {
    return (
      <div className="p-2 text-space-ui-subtext text-sm italic">
        Žádné záznamy v této kategorii
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {combinedEntries.map((entry) => (
        <div
          key={entry.entryId}
          className={`p-2 cursor-pointer rounded ${
            selectedEntry === entry.entryId
              ? 'bg-space-buttons/30 border border-space-buttons-border'
              : 'hover:bg-space-dark/50'
          }`}
          onClick={() => selectEntry(entry.entryId)}
        >
          <div className="flex items-center justify-between">
            <span className={`font-pixel text-sm ${selectedEntry === entry.entryId ? 'text-space-ui-text' : 'text-space-ui-subtext'}`}>
              {entry.entryTitle}
            </span>
            
            {entry.isNew && (
              <Badge 
                variant="outline" 
                className="text-[0.6rem] h-5 bg-blue-900/30 border-blue-700 text-blue-200"
              >
                NOVÉ
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
