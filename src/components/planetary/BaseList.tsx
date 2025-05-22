
import React from 'react';
import { PlanetaryBaseInstance } from '@/types/planetary';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { Card } from '@/components/ui/card';
import { Shield, Power, Database, AlertCircle } from 'lucide-react';

interface BaseListProps {
  bases: PlanetaryBaseInstance[];
  onSelect: (base: PlanetaryBaseInstance) => void;
}

const BaseList: React.FC<BaseListProps> = ({ bases, onSelect }) => {
  const { baseDefinitions } = usePlanetary();

  return (
    <div className="space-y-4">
      {bases.map((base) => {
        const baseDefinition = baseDefinitions.find(def => def.baseType === base.baseType);
        const statusIndicator = base.underAttack 
          ? 'bg-red-500' 
          : (base.powerBalance.generation < base.powerBalance.consumption)
            ? 'bg-yellow-500'
            : 'bg-green-500';

        return (
          <Card 
            key={base.baseId}
            className="p-4 bg-space-card border-space-border hover:bg-space-card-hover cursor-pointer transition-colors"
            onClick={() => onSelect(base)}
          >
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 bg-space-card-dark rounded-lg flex items-center justify-center">
                <img 
                  src={baseDefinition?.iconAsset_Map || '/placeholder.svg'} 
                  alt={base.name} 
                  className="h-10 w-10 object-contain"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-pixel text-lg text-space-ui-text">{base.name}</h3>
                  <div className={`h-3 w-3 rounded-full ${statusIndicator}`}></div>
                </div>
                <div className="text-sm text-space-ui-subtext mt-1">
                  {baseDefinition?.defaultBaseName || 'Planetární Základna'}
                </div>
                <div className="text-xs text-space-ui-subtext mt-1">
                  Systém: Alpha Centauri, Planeta: Terra Nova
                </div>
              </div>

              <div className="flex items-center space-x-4 text-space-ui-text">
                <div className="flex flex-col items-center">
                  <Power size={16} />
                  <span className="text-xs mt-1">{base.powerBalance.generation - base.powerBalance.consumption} MW</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Shield size={16} />
                  <span className="text-xs mt-1">{base.defenseStrength}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Database size={16} />
                  <span className="text-xs mt-1">{Object.keys(base.resources.stored).length}</span>
                </div>
                
                {base.underAttack && (
                  <div className="text-red-500 animate-pulse">
                    <AlertCircle size={20} />
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default BaseList;
