
import React from 'react';
import { useMissions } from '@/contexts/MissionsContext';
import { MissionData, MissionStatus, MissionType } from '@/types/missions';
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Eye, EyeOff, XCircle } from 'lucide-react';

const MissionList: React.FC = () => {
  const { 
    activeMissions, 
    completedMissions, 
    selectMission, 
    trackMission, 
    selectedMissionId, 
    trackedMissionId,
    filterMissionType
  } = useMissions();

  const getFilteredMissions = (missions: MissionData[]) => {
    if (!filterMissionType) return missions;
    return missions.filter(mission => mission.missionType === filterMissionType);
  };

  const getMissionTypeIcon = (type: MissionType) => {
    switch(type) {
      case MissionType.MainStory_Nexus:
        return <div className="h-5 w-5 bg-yellow-400 rounded-full"></div>;
      case MissionType.FactionStory_Major:
        return <div className="h-5 w-5 bg-blue-500 rounded-full"></div>;
      case MissionType.BountyHunt:
        return <div className="h-5 w-5 bg-red-500 rounded-full"></div>;
      case MissionType.Exploration_Survey:
        return <div className="h-5 w-5 bg-green-500 rounded-full"></div>;
      case MissionType.Delivery_Transport:
        return <div className="h-5 w-5 bg-orange-500 rounded-full"></div>;
      case MissionType.Mining_ResourceCollection:
        return <div className="h-5 w-5 bg-stone-500 rounded-full"></div>;
      case MissionType.PersonalCrewQuest:
        return <div className="h-5 w-5 bg-purple-500 rounded-full"></div>;
      default:
        return <div className="h-5 w-5 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusIcon = (mission: MissionData) => {
    if (mission.status === MissionStatus.Completed_Success) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (mission.status === MissionStatus.Completed_Failed || mission.status === MissionStatus.Completed_Expired) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    } else if (mission.status === MissionStatus.Active_TrackedByPlayer) {
      return <Eye className="h-5 w-5 text-yellow-400" />;
    } else {
      return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleTrackClick = (e: React.MouseEvent, missionId: string) => {
    e.stopPropagation(); // Prevent mission selection when clicking track
    
    if (trackedMissionId === missionId) {
      trackMission(null); // Untrack this mission
    } else {
      trackMission(missionId); // Track this mission
    }
  };

  const filteredActiveMissions = getFilteredMissions(activeMissions);
  const filteredCompletedMissions = getFilteredMissions(completedMissions);

  const renderMissionItem = (mission: MissionData) => {
    const isSelected = mission.missionId === selectedMissionId;
    const isTracked = mission.missionId === trackedMissionId;
    const isCompleted = mission.status === MissionStatus.Completed_Success || 
                        mission.status === MissionStatus.Completed_Failed || 
                        mission.status === MissionStatus.Completed_Expired;

    return (
      <div 
        key={mission.missionId} 
        onClick={() => selectMission(mission.missionId)}
        className={cn(
          "flex items-center p-3 mb-2 rounded-md cursor-pointer border border-transparent transition-colors",
          isSelected 
            ? "bg-space-buttons/80 border-space-buttons-border" 
            : "bg-space-dark/60 hover:bg-space-dark/40",
          isTracked && "border-l-4 border-l-yellow-400"
        )}
      >
        <div className="mr-3">
          {getMissionTypeIcon(mission.missionType)}
        </div>
        
        <div className="flex-grow">
          <div className={cn(
            "font-pixel text-sm",
            isCompleted ? "text-space-ui-subtext" : "text-space-ui-text"
          )}>
            {mission.defaultMissionTitle}
          </div>
          
          {mission.missionGiver_DisplayNameKey && (
            <div className="text-xs text-space-ui-subtext">
              {mission.defaultMissionGiver_DisplayName}
            </div>
          )}
        </div>
        
        <div className="ml-2">
          {getStatusIcon(mission)}
        </div>
        
        {!isCompleted && (
          <button 
            className="ml-2 p-1 rounded-full hover:bg-space-dark/80"
            onClick={(e) => handleTrackClick(e, mission.missionId)}
          >
            {isTracked ? (
              <EyeOff className="h-4 w-4 text-space-ui-subtext" />
            ) : (
              <Eye className="h-4 w-4 text-space-ui-subtext" />
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto">
      <div className="sticky top-0 z-10 bg-space-dark p-2 mb-4 border-b border-space-border">
        <h3 className="font-pixel text-space-ui-text">Aktivní Mise</h3>
      </div>
      
      {filteredActiveMissions.length > 0 ? (
        filteredActiveMissions.map(renderMissionItem)
      ) : (
        <div className="text-center p-4 text-space-ui-subtext font-pixel">
          Žádné aktivní mise
        </div>
      )}
      
      <div className="sticky top-0 z-10 bg-space-dark p-2 my-4 border-b border-space-border">
        <h3 className="font-pixel text-space-ui-text">Dokončené Mise</h3>
      </div>
      
      {filteredCompletedMissions.length > 0 ? (
        filteredCompletedMissions.map(renderMissionItem)
      ) : (
        <div className="text-center p-4 text-space-ui-subtext font-pixel">
          Žádné dokončené mise
        </div>
      )}
    </div>
  );
};

export default MissionList;
