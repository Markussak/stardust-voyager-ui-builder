
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MissionData, MissionStatus, MissionType, MissionsContextType } from '../types/missions';
import { sampleMissions } from '../data/sampleMissions';

const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export function MissionsProvider({ children }: { children: ReactNode }) {
  const [missions, setMissions] = useState<MissionData[]>(sampleMissions);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [trackedMissionId, setTrackedMissionId] = useState<string | null>(null);
  const [filterMissionType, setFilterMissionType] = useState<MissionType | null>(null);
  const [sortOption, setSortOption] = useState<string>('ByDate_Accepted_Newest');

  const activeMissions = missions.filter(mission => 
    mission.status === MissionStatus.Active_InProgress || 
    mission.status === MissionStatus.Active_TrackedByPlayer
  );

  const completedMissions = missions.filter(mission => 
    mission.status === MissionStatus.Completed_Success || 
    mission.status === MissionStatus.Completed_Failed ||
    mission.status === MissionStatus.Completed_Expired
  );

  const selectMission = (missionId: string) => {
    setSelectedMissionId(missionId);
  };

  const trackMission = (missionId: string | null) => {
    // If we are tracking a different mission, untrack it first
    if (trackedMissionId && missionId !== trackedMissionId) {
      setMissions(prevMissions => prevMissions.map(mission => 
        mission.missionId === trackedMissionId
          ? { ...mission, status: MissionStatus.Active_InProgress }
          : mission
      ));
    }

    // Track the new mission or untrack if null
    if (missionId) {
      setMissions(prevMissions => prevMissions.map(mission => 
        mission.missionId === missionId
          ? { ...mission, status: MissionStatus.Active_TrackedByPlayer }
          : mission
      ));
    }
    
    setTrackedMissionId(missionId);
  };

  const getMissionById = (missionId: string) => {
    return missions.find(mission => mission.missionId === missionId) || null;
  };

  const completeObjective = (missionId: string, objectiveId: string) => {
    setMissions(prevMissions => prevMissions.map(mission => {
      if (mission.missionId !== missionId) return mission;
      
      const updatedObjectives = mission.objectives.map(objective =>
        objective.objectiveId === objectiveId
          ? { ...objective, status: 'Completed' as const }
          : objective
      );
      
      return { ...mission, objectives: updatedObjectives };
    }));
  };

  const completeMission = (missionId: string, success: boolean) => {
    setMissions(prevMissions => prevMissions.map(mission => {
      if (mission.missionId !== missionId) return mission;
      
      // If this was the tracked mission, untrack it
      if (trackedMissionId === missionId) {
        setTrackedMissionId(null);
      }
      
      return {
        ...mission,
        status: success ? MissionStatus.Completed_Success : MissionStatus.Completed_Failed
      };
    }));
  };

  const addMission = (mission: MissionData) => {
    setMissions(prevMissions => [...prevMissions, mission]);
  };

  const abandonMission = (missionId: string) => {
    setMissions(prevMissions => prevMissions.map(mission =>
      mission.missionId === missionId
        ? { ...mission, status: MissionStatus.Completed_Failed }
        : mission
    ));
    
    if (trackedMissionId === missionId) {
      setTrackedMissionId(null);
    }
    
    if (selectedMissionId === missionId) {
      setSelectedMissionId(null);
    }
  };

  const value = {
    activeMissions,
    completedMissions,
    selectedMissionId,
    trackedMissionId,
    selectMission,
    trackMission,
    getMissionById,
    completeObjective,
    completeMission,
    addMission,
    abandonMission,
    filterMissionType,
    setFilterMissionType,
    sortOption,
    setSortOption
  };

  return (
    <MissionsContext.Provider value={value}>
      {children}
    </MissionsContext.Provider>
  );
}

export const useMissions = () => {
  const context = useContext(MissionsContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionsProvider');
  }
  return context;
};
