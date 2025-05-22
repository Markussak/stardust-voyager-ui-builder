
import React from 'react';
import { 
  PlanetaryBaseInstance, 
  PlanetaryBaseModuleInstance 
} from '@/types/planetary';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, ArrowUpCircle, Power, Shield, Database } from 'lucide-react';

interface BaseDetailPanelProps {
  base: PlanetaryBaseInstance;
}

const BaseDetailPanel: React.FC<BaseDetailPanelProps> = ({ base }) => {
  const { 
    baseDefinitions, 
    moduleDefinitions,
    upgradeModule,
    demolishModule,
    collectResources
  } = usePlanetary();

  const baseDefinition = baseDefinitions.find(def => def.baseType === base.baseType);

  if (!baseDefinition) {
    return <div>Error: Base definition not found.</div>;
  }

  const renderModuleCard = (module: PlanetaryBaseModuleInstance, index: number) => {
    const moduleDef = moduleDefinitions.find(def => def.moduleId === module.moduleId);
    if (!moduleDef) return null;

    return (
      <Card 
        key={`${module.moduleId}_${index}`}
        className={`p-3 ${module.isPowered ? 'bg-space-card' : 'bg-space-card-dark opacity-70'} 
                    border-space-border`}
      >
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-space-card-dark rounded-lg flex items-center justify-center">
            <img 
              src={moduleDef.iconAsset || '/placeholder.svg'} 
              alt={moduleDef.defaultModuleName} 
              className="h-8 w-8 object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-space-ui-text">{moduleDef.defaultModuleName}</h4>
            <div className="flex items-center space-x-2 text-xs text-space-ui-subtext">
              <span>Úroveň {module.level}</span>
              {module.isPowered ? (
                <span className="text-green-400">Aktivní</span>
              ) : (
                <span className="text-red-400">Nenapájený</span>
              )}
            </div>
            
            {module.constructionProgress !== undefined && module.constructionProgress < 100 && (
              <div className="mt-1">
                <Progress value={module.constructionProgress} className="h-1" />
                <div className="text-xs text-space-ui-subtext mt-1">
                  Stavba: {module.constructionProgress}%
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-1">
            {module.constructionProgress === undefined || module.constructionProgress === 100 ? (
              <>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 text-space-ui-text hover:text-space-accent hover:bg-transparent"
                  onClick={() => upgradeModule(base.baseId, index)}
                >
                  <ArrowUpCircle size={18} />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-transparent"
                  onClick={() => demolishModule(base.baseId, index)}
                >
                  <Trash2 size={18} />
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-space-card border-space-border">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="font-pixel text-xl text-space-ui-text">{base.name}</CardTitle>
            <Button 
              size="sm" 
              onClick={() => collectResources(base.baseId)}
              className="bg-space-accent text-black hover:bg-space-accent/80"
            >
              Shromáždit Zdroje
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-space-card-dark p-3 rounded-md flex items-center space-x-3">
              <Power className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-xs text-space-ui-subtext">Energie</div>
                <div className="text-lg font-medium text-space-ui-text">
                  {base.powerBalance.generation - base.powerBalance.consumption} MW
                </div>
              </div>
            </div>
            
            <div className="bg-space-card-dark p-3 rounded-md flex items-center space-x-3">
              <Shield className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-xs text-space-ui-subtext">Obrana</div>
                <div className="text-lg font-medium text-space-ui-text">
                  {base.defenseStrength}
                </div>
              </div>
            </div>
            
            <div className="bg-space-card-dark p-3 rounded-md flex items-center space-x-3">
              <Database className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-xs text-space-ui-subtext">Moduly</div>
                <div className="text-lg font-medium text-space-ui-text">
                  {base.modules.length}/{baseDefinition.maxModules_Initial}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium text-space-ui-text mb-2">Instalované Moduly</h3>
            <div className="space-y-2">
              {base.modules.length > 0 ? (
                base.modules.map((module, index) => renderModuleCard(module, index))
              ) : (
                <p className="text-sm text-space-ui-subtext py-3 text-center">
                  Žádné instalované moduly. Přidejte nové moduly z panelu vpravo.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseDetailPanel;
