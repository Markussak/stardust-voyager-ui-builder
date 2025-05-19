
import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { ResearchNodeState } from '@/types/research';

interface ResearchConnectionProps {
  fromTechId: string;
  toTechId: string;
}

const ResearchConnection: React.FC<ResearchConnectionProps> = ({ fromTechId, toTechId }) => {
  const { getTechById, getNodeState } = useResearch();
  
  const fromTech = getTechById(fromTechId);
  const toTech = getTechById(toTechId);
  
  if (!fromTech || !toTech) return null;
  
  const fromState = getNodeState(fromTechId);
  const toState = getNodeState(toTechId);
  
  // Calculate positions
  const fromPos = fromTech.nodePosition_InTree;
  const toPos = toTech.nodePosition_InTree;
  
  // Determine connection style based on states
  let strokeColor = '#404050'; // Default locked color
  let strokeWidth = 1;
  let dashArray = '';
  
  if (fromState === ResearchNodeState.Researched) {
    if (toState === ResearchNodeState.AvailableToResearch || 
        toState === ResearchNodeState.Locked_ResourcesNotAvailable ||
        toState === ResearchNodeState.CurrentlyResearching) {
      strokeColor = '#3388FF'; // Available color
      strokeWidth = 2;
      dashArray = '5,3';
    } else if (toState === ResearchNodeState.Researched) {
      strokeColor = '#00CCFF'; // Researched color
      strokeWidth = 2;
    }
  }
  
  return (
    <svg 
      style={{ 
        position: 'absolute', 
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
      />
    </svg>
  );
};

export default ResearchConnection;
