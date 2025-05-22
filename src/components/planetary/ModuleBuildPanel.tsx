
import React from 'react';
import { usePlanetary } from '@/contexts/PlanetaryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ModuleBuildPanelProps {
  baseId: string;
}

const ModuleBuildPanel: React.FC<ModuleBuildPanelProps> = ({ baseId }) => {
  const { playerBases, moduleDefinitions, baseDefinitions, constructModule } = usePlanetary();
  const base = playerBases.find(b => b.baseId === baseId);
  
  if (!base) return null;
  
  const baseDefinition = baseDefinitions.find(def => def.baseType === base.baseType);
  if (!baseDefinition) return null;
  
  // Filter modules that can be built on this base type
  const availableModules = moduleDefinitions.filter(mod => 
    baseDefinition.availableModules_ByType.includes(mod.moduleId)
  );
  
  // Check if the module can still be built (instance limit)
  const canBuildModule = (moduleId: string) => {
    const moduleDef = moduleDefinitions.find(def => def.moduleId === moduleId);
    if (!moduleDef) return false;
    
    if (moduleDef.maxInstances_PerBase) {
      const currentInstances = base.modules.filter(mod => mod.moduleId === moduleId).length;
      return currentInstances < moduleDef.maxInstances_PerBase;
    }
    
    return base.modules.length < baseDefinition.maxModules_Initial;
  };
  
  return (
    <Card className="bg-space-card border-space-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="font-pixel text-space-ui-text">Postavit Nový Modul</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="space-y-3 pr-4">
            {availableModules.length > 0 ? (
              availableModules.map((module) => {
                const canBuild = canBuildModule(module.moduleId);
                
                return (
                  <Card 
                    key={module.moduleId}
                    className={`p-3 ${canBuild ? 'bg-space-card-dark' : 'bg-space-card-dark opacity-50'} 
                               border-space-border`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-space-card rounded-lg flex items-center justify-center">
                        <img 
                          src={module.iconAsset || '/placeholder.svg'} 
                          alt={module.defaultModuleName} 
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-space-ui-text">{module.defaultModuleName}</h4>
                        <p className="text-xs text-space-ui-subtext line-clamp-2">
                          {module.defaultDescription}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-space-ui-subtext">
                          {module.powerGeneration_MW && (
                            <div className="text-green-400">+{module.powerGeneration_MW} MW</div>
                          )}
                          {module.powerConsumption_MW && (
                            <div className="text-red-400">-{module.powerConsumption_MW} MW</div>
                          )}
                          {module.defenseValue_TurretStrength && (
                            <div>Obrana: +{module.defenseValue_TurretStrength}</div>
                          )}
                          {module.defenseValue_ShieldStrength && (
                            <div>Štít: +{module.defenseValue_ShieldStrength}</div>
                          )}
                          {module.habitationCapacity_Crew && (
                            <div>Kapacita: {module.habitationCapacity_Crew}</div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        disabled={!canBuild} 
                        onClick={() => constructModule(baseId, module.moduleId)}
                        className="bg-space-accent text-black hover:bg-space-accent/80"
                      >
                        Postavit
                      </Button>
                    </div>
                    
                    {!canBuild && (
                      <p className="text-xs text-red-400 mt-2">
                        Dosažen limit tohoto modulu.
                      </p>
                    )}
                  </Card>
                );
              })
            ) : (
              <p className="text-sm text-space-ui-subtext py-3 text-center">
                Pro tento typ základny nejsou k dispozici žádné moduly.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ModuleBuildPanel;
