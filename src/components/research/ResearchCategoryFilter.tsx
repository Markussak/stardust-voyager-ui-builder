
import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResearchCategoryFilter: React.FC = () => {
  const { categories, researchState, setActiveCategoryFilter } = useResearch();
  
  const handleCategoryChange = (value: string) => {
    setActiveCategoryFilter(value === 'all' ? undefined : value);
  };
  
  return (
    <Tabs 
      defaultValue="all" 
      value={researchState.activeCategoryFilter || 'all'}
      onValueChange={handleCategoryChange}
      className="w-full"
    >
      <TabsList className="w-full flex bg-space-dark border border-space-buttons-border">
        <TabsTrigger 
          value="all" 
          className="flex-1 data-[state=active]:bg-space-buttons data-[state=active]:text-white"
        >
          Vše
        </TabsTrigger>
        
        {categories.map(category => (
          <TabsTrigger 
            key={category.categoryKey}
            value={category.categoryKey}
            className="flex-1 data-[state=active]:bg-space-buttons data-[state=active]:text-white"
            style={{ 
              '--tab-highlight': category.colorTheme || '#9b87f5'
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.colorTheme || '#9b87f5' }}
              ></div>
              <span>{category.defaultDisplayName}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ResearchCategoryFilter;
