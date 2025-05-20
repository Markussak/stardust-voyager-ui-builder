
import React from 'react';
import { useMissions } from '@/contexts/MissionsContext';
import { MissionObjective, MissionStatus } from '@/types/missions';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, MapPin, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const MissionDetails: React.FC = () => {
  const { 
    selectedMissionId, 
    getMissionById, 
    trackMission, 
    trackedMissionId,
    completeObjective,
    abandonMission
  } = useMissions();
  
  const mission = selectedMissionId ? getMissionById(selectedMissionId) : null;
  const isTracked = trackedMissionId === selectedMissionId;
  
  const isCompleted = mission?.status === MissionStatus.Completed_Success || 
                      mission?.status === MissionStatus.Completed_Failed || 
                      mission?.status === MissionStatus.Completed_Expired;
  
  if (!mission) {
    return (
      <div className="flex items-center justify-center h-full text-space-ui-subtext font-pixel">
        Vyberte misi ze seznamu pro zobrazení detailů
      </div>
    );
  }

  // Function to render an objective
  const renderObjective = (objective: MissionObjective) => {
    const isCompleted = objective.status === 'Completed';
    const isPending = objective.status === 'Pending';
    const isActive = objective.status === 'InProgress';
    
    // Hide objectives that should be hidden until previous ones are completed
    const shouldShow = !objective.isHiddenUntilPreviousCompleted || isCompleted || isActive;
    if (!shouldShow) return null;
    
    // Handle quantity display for collection objectives
    const quantityText = objective.quantityRequired && objective.quantityCurrent !== undefined
      ? ` (${objective.quantityCurrent}/${objective.quantityRequired})`
      : '';
    
    return (
      <div key={objective.objectiveId} className="flex items-start mb-3 group">
        <div className="mr-2 mt-1">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : isPending ? (
            <Circle className="h-5 w-5 text-space-ui-subtext" />
          ) : (
            <Circle className="h-5 w-5 text-yellow-400" />
          )}
        </div>
        
        <div className="flex-grow">
          <p className={`text-sm ${isCompleted ? 'text-space-ui-subtext line-through' : 'text-space-ui-text'}`}>
            {objective.defaultDescription}{quantityText}
            {objective.isOptional && <span className="ml-2 text-xs text-space-ui-subtext">(Volitelné)</span>}
          </p>
        </div>
        
        {objective.showOnMap_Button_Enabled && !isCompleted && (
          <button className="opacity-0 group-hover:opacity-100 ml-2 text-space-ui-subtext hover:text-space-ui-text">
            <MapPin className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };
  
  // Function to render a reward
  const renderReward = (reward: any, index: number) => (
    <div key={index} className="flex items-center mb-2">
      <div className="w-6 h-6 bg-gray-700 rounded-full mr-2"></div>
      <span className="text-sm text-space-ui-text">{reward.defaultDescription}</span>
    </div>
  );
  
  // Number of completed objectives
  const completedObjectivesCount = mission.objectives.filter(obj => obj.status === 'Completed').length;
  const progress = completedObjectivesCount / mission.objectives.length;
  
  // Determine mission status text
  let statusText;
  let statusColor;
  
  if (mission.status === MissionStatus.Completed_Success) {
    statusText = "Dokončeno - Úspěch";
    statusColor = "text-green-500";
  } else if (mission.status === MissionStatus.Completed_Failed) {
    statusText = "Dokončeno - Neúspěch";
    statusColor = "text-red-500";
  } else if (mission.status === MissionStatus.Completed_Expired) {
    statusText = "Dokončeno - Vypršelo";
    statusColor = "text-orange-500";
  } else if (mission.status === MissionStatus.Active_TrackedByPlayer) {
    statusText = "Aktivní - Sledovaná";
    statusColor = "text-yellow-400";
  } else if (mission.status === MissionStatus.Active_InProgress) {
    statusText = "Aktivní";
    statusColor = "text-blue-400";
  } else {
    statusText = "Dostupná";
    statusColor = "text-gray-400";
  }
  
  return (
    <ScrollArea className="h-full pr-4">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-pixel text-space-ui-text">
            {mission.defaultMissionTitle}
          </h2>
          <span className={`text-sm ${statusColor} font-pixel`}>{statusText}</span>
        </div>
        
        {mission.missionGiver_DisplayNameKey && (
          <div className="mb-4">
            <h3 className="text-sm font-pixel text-space-ui-subtext mb-1">Zadavatel</h3>
            <div className="flex items-center">
              {mission.missionGiver_PortraitAsset ? (
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
              ) : null}
              <span className="text-space-ui-text">{mission.defaultMissionGiver_DisplayName}</span>
            </div>
          </div>
        )}
        
        {mission.defaultBriefingDialog && (
          <div className="mb-6 bg-space-dark/40 p-3 rounded-md border-l-2 border-space-buttons">
            <p className="text-sm text-space-ui-text italic font-pixel">
              "{mission.defaultBriefingDialog}"
            </p>
          </div>
        )}
        
        {mission.defaultFullDescription_Lore && (
          <div className="mb-6">
            <h3 className="text-sm font-pixel text-space-ui-subtext mb-1">Popis Úlohy</h3>
            <p className="text-sm text-space-ui-text">
              {mission.defaultFullDescription_Lore}
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-pixel text-space-ui-subtext">Cíle</h3>
            <span className="text-xs text-space-ui-subtext">
              {completedObjectivesCount}/{mission.objectives.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-space-dark rounded-full mb-4">
            <div 
              className="h-full bg-space-buttons rounded-full" 
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
          
          <div className="pl-2">
            {mission.objectives.map(renderObjective)}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-pixel text-space-ui-subtext mb-2">Odměny</h3>
          <div className="grid grid-cols-2 gap-2">
            {mission.rewards_OnFinalCompletion.map(renderReward)}
          </div>
        </div>
        
        {mission.timeLimit_GameDays && (
          <div className="flex items-center mb-4 text-yellow-400">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-xs">
              Časový limit: {mission.timeLimit_GameDays} dní
            </span>
          </div>
        )}
        
        {mission.suggestedPlayerLevel_Or_ShipTier && (
          <div className="flex items-center mb-6 text-space-ui-subtext">
            <span className="text-xs">
              Doporučená úroveň: {mission.suggestedPlayerLevel_Or_ShipTier}
            </span>
          </div>
        )}
        
        {!isCompleted && (
          <div className="flex space-x-3 mt-8">
            <Button 
              variant="outline" 
              onClick={() => trackMission(isTracked ? null : selectedMissionId)}
              className="flex-1"
            >
              {isTracked ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Přestat sledovat
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Sledovat
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={() => abandonMission(selectedMissionId)}
              className="flex-1"
            >
              Vzdát se mise
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MissionDetails;
