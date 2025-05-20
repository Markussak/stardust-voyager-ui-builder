
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for the Codex system
export interface CodexCategory {
  categoryKey: string;
  displayName: string;
  icon: string;
  description?: string;
  subCategories?: CodexCategory[];
  hasNewEntries?: boolean;
}

export interface FormattedTextElement {
  type: 'Paragraph' | 'Header1' | 'Header2' | 'BulletedList' | 'NumberedList' | 'Quote' | 'Data_Table';
  content: string | string[] | Array<{ [key: string]: string }>;
  hyperlinks?: Array<{ textToLink: string; targetCodexEntryId: string; }>;
}

export interface PixelArtIllustration {
  assetUrl: string;
  dimensions: { x: number; y: number };
  caption?: string;
  alignment: 'Top' | 'Center' | 'Inline_With_Text';
}

export interface CodexEntry {
  entryId: string;
  entryTitle: string;
  categoryKey: string;
  isUnlocked: boolean;
  unlockCondition?: string;
  mainIllustration?: PixelArtIllustration;
  contentElements: FormattedTextElement[];
  relatedEntries?: string[];
  audioLogAsset?: string;
  lastUpdated?: number;
  isNew?: boolean;
}

interface CodexContextType {
  categories: CodexCategory[];
  entries: CodexEntry[];
  selectedCategory: string | null;
  selectedEntry: string | null;
  filteredEntries: CodexEntry[];
  selectCategory: (categoryKey: string) => void;
  selectEntry: (entryId: string) => void;
  markEntryAsRead: (entryId: string) => void;
  searchEntries: (query: string) => void;
}

const CodexContext = createContext<CodexContextType | undefined>(undefined);

export const useCodex = () => {
  const context = useContext(CodexContext);
  if (!context) {
    throw new Error('useCodex must be used within a CodexProvider');
  }
  return context;
};

// Mock data for the Codex
const mockCategories: CodexCategory[] = [
  {
    categoryKey: 'CELESTIAL_BODIES',
    displayName: 'Vesmírná tělesa',
    icon: 'planet',
    description: 'Planety, hvězdy a další vesmírná tělesa',
    subCategories: [
      {
        categoryKey: 'CELESTIAL_BODIES_PLANETS',
        displayName: 'Planety',
        icon: 'planet',
        hasNewEntries: true
      },
      {
        categoryKey: 'CELESTIAL_BODIES_STARS',
        displayName: 'Hvězdy',
        icon: 'star'
      }
    ]
  },
  {
    categoryKey: 'FACTIONS',
    displayName: 'Frakce',
    icon: 'faction',
    description: 'Galaktické frakce a jejich historie',
    hasNewEntries: true
  },
  {
    categoryKey: 'TECHNOLOGIES',
    displayName: 'Technologie',
    icon: 'tech',
    description: 'Technologické poznatky a objevy'
  },
  {
    categoryKey: 'LORE_HISTORY',
    displayName: 'Historie',
    icon: 'book',
    description: 'Historické záznamy a události'
  }
];

const mockEntries: CodexEntry[] = [
  {
    entryId: 'planet_type_earthlike',
    entryTitle: 'Planeta Zemského Typu',
    categoryKey: 'CELESTIAL_BODIES_PLANETS',
    isUnlocked: true,
    mainIllustration: {
      assetUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      dimensions: { x: 300, y: 200 },
      alignment: 'Top'
    },
    contentElements: [
      { 
        type: 'Paragraph', 
        content: 'Světy překypující životem, s rozsáhlými oceány tekuté vody, stabilním klimatem a dýchatelnou atmosférou. Jsou primárním cílem pro kolonizaci a domovem mnoha rozvinutých civilizací.' 
      },
      { 
        type: 'Header2', 
        content: 'Geologické Charakteristiky' 
      },
      { 
        type: 'Paragraph', 
        content: 'Rozmanitá geologie s aktivní tektonikou, formující kontinenty, pohoří a oceánské příkopy. Častý výskyt různých biomů od tropických pralesů po mírné lesy a tundry.' 
      },
      { 
        type: 'BulletedList', 
        content: ['Aktivní desková tektonika', 'Přítomnost magnetického pole', 'Bohaté zásoby vody'] 
      }
    ],
    relatedEntries: ['planet_earth', 'faction_solar_confederacy'],
    isNew: true
  },
  {
    entryId: 'planet_earth',
    entryTitle: 'Země',
    categoryKey: 'CELESTIAL_BODIES_PLANETS',
    isUnlocked: true,
    mainIllustration: {
      assetUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      dimensions: { x: 300, y: 200 },
      alignment: 'Top'
    },
    contentElements: [
      { 
        type: 'Paragraph', 
        content: 'Kolébka lidstva, třetí planeta Sluneční soustavy. Navzdory své malé velikosti je jedním z nejdůležitějších světů v galaxii.' 
      },
      { 
        type: 'Header2', 
        content: 'Historie' 
      },
      { 
        type: 'Paragraph', 
        content: 'Země je domovskou planetou lidstva a sídlem Solární Konfederace. V 22. století se stala centrem rychlé technologické expanze, která vedla k objevu hyperpohonu v roce 2142.' 
      }
    ]
  },
  {
    entryId: 'faction_solar_confederacy',
    entryTitle: 'Solární Konfederace',
    categoryKey: 'FACTIONS',
    isUnlocked: true,
    mainIllustration: {
      assetUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      dimensions: { x: 300, y: 200 },
      alignment: 'Top'
    },
    contentElements: [
      { 
        type: 'Paragraph', 
        content: 'Demokratické uskupení planet se Zemí jako hlavním centrem. Podporuje svobodu, vědu a obchod napříč galaxií.' 
      },
      { 
        type: 'Header2', 
        content: 'Politický systém' 
      },
      { 
        type: 'Paragraph', 
        content: 'V čele stojí Prezident a Senát, kde jsou zastoupeny všechny členské planety. Konfederace je známá svým důrazem na lidská práva a osobní svobody.' 
      }
    ],
    isNew: true
  }
];

export const CodexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories] = useState<CodexCategory[]>(mockCategories);
  const [entries] = useState<CodexEntry[]>(mockEntries);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<CodexEntry[]>(entries.filter(e => e.isUnlocked));

  const selectCategory = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setFilteredEntries(entries.filter(e => 
      (e.categoryKey === categoryKey || 
       categories.find(c => c.categoryKey === categoryKey)?.subCategories?.some(sc => sc.categoryKey === e.categoryKey)) && 
      e.isUnlocked
    ));
  };

  const selectEntry = (entryId: string) => {
    setSelectedEntry(entryId);
  };

  const markEntryAsRead = (entryId: string) => {
    // In a real implementation, we would update the entry in the state
    console.log(`Marking entry ${entryId} as read`);
  };

  const searchEntries = (query: string) => {
    if (!query) {
      setFilteredEntries(entries.filter(e => e.isUnlocked));
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    setFilteredEntries(
      entries.filter(e => 
        e.isUnlocked && 
        (e.entryTitle.toLowerCase().includes(lowerQuery) || 
         e.contentElements.some(ce => 
           typeof ce.content === 'string' && ce.content.toLowerCase().includes(lowerQuery) ||
           Array.isArray(ce.content) && ce.content.some(c => 
             typeof c === 'string' && c.toLowerCase().includes(lowerQuery)
           )
         ))
      )
    );
  };

  const value = {
    categories,
    entries,
    selectedCategory,
    selectedEntry,
    filteredEntries,
    selectCategory,
    selectEntry,
    markEntryAsRead,
    searchEntries
  };

  return (
    <CodexContext.Provider value={value}>
      {children}
    </CodexContext.Provider>
  );
};
