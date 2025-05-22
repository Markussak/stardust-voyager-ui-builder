
import React from 'react';
import { useCodex } from '@/contexts/CodexContext';
import { useProceduralLore } from '@/contexts/ProceduralLoreContext';
import { Button } from '@/components/ui/button';
import LoreFragmentView from './LoreFragmentView';

const EntryDetailView: React.FC = () => {
  const { entries, selectedEntry, selectEntry } = useCodex();
  const { generatedLoreFragments } = useProceduralLore();
  
  if (!selectedEntry) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] text-space-ui-subtext">
        <p className="font-pixel text-center mb-4">Vyberte záznam ze seznamu</p>
      </div>
    );
  }
  
  // Check if this is a procedural lore fragment
  if (selectedEntry.startsWith('lore_')) {
    return <LoreFragmentView fragmentId={selectedEntry} />;
  }

  const entry = entries.find(e => e.entryId === selectedEntry);
  
  if (!entry) {
    return (
      <div className="flex justify-center items-center h-[400px] text-space-ui-subtext font-pixel">
        Záznam nebyl nalezen
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-pixel text-2xl text-space-ui-text mb-4">{entry.entryTitle}</h1>
      
      {entry.mainIllustration && (
        <div className="mb-6">
          <img 
            src={entry.mainIllustration.assetUrl} 
            alt={entry.entryTitle} 
            className="w-full h-auto max-h-[250px] object-cover rounded-md mb-1"
          />
          {entry.mainIllustration.caption && (
            <p className="text-xs text-center text-space-ui-subtext">{entry.mainIllustration.caption}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {entry.contentElements.map((element, index) => {
          switch (element.type) {
            case 'Header1':
              return <h2 key={index} className="font-pixel text-xl text-space-ui-text">{element.content as string}</h2>;
            case 'Header2':
              return <h3 key={index} className="font-pixel text-lg text-space-ui-text">{element.content as string}</h3>;
            case 'Paragraph':
              return <p key={index} className="text-space-ui-text">{element.content as string}</p>;
            case 'BulletedList':
              return (
                <ul key={index} className="list-disc list-inside text-space-ui-text">
                  {(element.content as string[]).map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              );
            case 'NumberedList':
              return (
                <ol key={index} className="list-decimal list-inside text-space-ui-text">
                  {(element.content as string[]).map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ol>
              );
            case 'Quote':
              return (
                <blockquote key={index} className="border-l-4 pl-4 italic text-space-ui-subtext">
                  {element.content as string}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </div>
      
      {entry.relatedEntries && entry.relatedEntries.length > 0 && (
        <div className="mt-6 border-t border-space-buttons-border pt-4">
          <h4 className="font-pixel text-sm text-space-ui-text mb-2">Související záznamy</h4>
          <div className="flex flex-wrap gap-2">
            {entry.relatedEntries.map(relatedId => {
              const relatedEntry = entries.find(e => e.entryId === relatedId && e.isUnlocked);
              if (!relatedEntry) return null;
              
              return (
                <Button 
                  key={relatedId}
                  variant="outline"
                  size="sm"
                  onClick={() => selectEntry(relatedId)}
                  className="text-xs border-space-buttons-border text-space-ui-text"
                >
                  {relatedEntry.entryTitle}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryDetailView;
