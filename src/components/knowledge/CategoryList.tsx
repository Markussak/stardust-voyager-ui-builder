
import React from 'react';
import { useCodex, CodexCategory } from '@/contexts/CodexContext';
import { cn } from "@/lib/utils";
import { Book, BookOpen, Folder, FolderOpen, Image, ListOrdered } from 'lucide-react';

const CategoryList: React.FC = () => {
  const { categories, selectCategory, selectedCategory } = useCodex();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'book': return <Book className="h-5 w-5" />;
      case 'planet': return <Image className="h-5 w-5" />;
      case 'faction': return <ListOrdered className="h-5 w-5" />;
      case 'tech': return <FolderOpen className="h-5 w-5" />;
      default: return <Book className="h-5 w-5" />;
    }
  };

  const renderCategory = (category: CodexCategory) => (
    <div key={category.categoryKey}>
      <button 
        onClick={() => selectCategory(category.categoryKey)}
        className={cn(
          "w-full flex items-center p-2 mb-2 rounded transition-colors",
          selectedCategory === category.categoryKey 
            ? "bg-space-buttons/80 border border-space-buttons-border" 
            : "bg-space-dark/60 hover:bg-space-dark/40 border border-transparent"
        )}
      >
        <div className="mr-2 text-space-ui-text">
          {getCategoryIcon(category.icon)}
        </div>
        <span className="text-left font-pixel text-sm text-space-ui-text">{category.displayName}</span>
        {category.hasNewEntries && (
          <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></div>
        )}
      </button>
      
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="pl-4 mb-2">
          {category.subCategories.map(subCategory => renderCategory(subCategory))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-1">
      {categories.map(category => renderCategory(category))}
    </div>
  );
};

export default CategoryList;
