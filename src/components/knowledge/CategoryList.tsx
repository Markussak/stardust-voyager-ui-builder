
import React from 'react';
import { useCodex } from '@/contexts/CodexContext';
import { useProceduralLore } from '@/contexts/ProceduralLoreContext';

const CategoryList: React.FC = () => {
  const { categories, selectedCategory, selectCategory } = useCodex();
  const { generatedLoreFragments, recentlyGeneratedLoreIds } = useProceduralLore();
  
  // Add a procedural lore category if we have any fragments
  const hasProceduralLore = generatedLoreFragments.length > 0;
  const hasNewProceduralLore = recentlyGeneratedLoreIds.length > 0;
  
  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <React.Fragment key={category.categoryKey}>
          <div
            className={`p-2 cursor-pointer rounded ${
              selectedCategory === category.categoryKey
                ? 'bg-space-buttons/30 border border-space-buttons-border'
                : 'hover:bg-space-dark/50'
            }`}
            onClick={() => selectCategory(category.categoryKey)}
          >
            <div className="font-pixel text-sm flex items-center">
              <span className={selectedCategory === category.categoryKey ? 'text-space-ui-text' : 'text-space-ui-subtext'}>
                {category.displayName}
              </span>
              {category.hasNewEntries && (
                <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full"></span>
              )}
            </div>
          </div>

          {/* Render subcategories */}
          {selectedCategory === category.categoryKey && category.subCategories && (
            <div className="pl-4 space-y-1 border-l border-space-buttons-border/30 ml-2">
              {category.subCategories.map((subCategory) => (
                <div
                  key={subCategory.categoryKey}
                  className={`p-1 cursor-pointer rounded ${
                    selectedCategory === subCategory.categoryKey
                      ? 'bg-space-buttons/30 border border-space-buttons-border'
                      : 'hover:bg-space-dark/50'
                  }`}
                  onClick={() => selectCategory(subCategory.categoryKey)}
                >
                  <div className="font-pixel text-xs flex items-center">
                    <span className={selectedCategory === subCategory.categoryKey ? 'text-space-ui-text' : 'text-space-ui-subtext'}>
                      {subCategory.displayName}
                    </span>
                    {subCategory.hasNewEntries && (
                      <span className="ml-2 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
      
      {/* Add procedural lore category */}
      {hasProceduralLore && (
        <div
          className={`p-2 cursor-pointer rounded ${
            selectedCategory === 'PROCEDURAL_LORE'
              ? 'bg-space-buttons/30 border border-space-buttons-border'
              : 'hover:bg-space-dark/50'
          }`}
          onClick={() => selectCategory('PROCEDURAL_LORE')}
        >
          <div className="font-pixel text-sm flex items-center">
            <span className={selectedCategory === 'PROCEDURAL_LORE' ? 'text-space-ui-text' : 'text-space-ui-subtext'}>
              Objevené záznamy
            </span>
            {hasNewProceduralLore && (
              <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full"></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
