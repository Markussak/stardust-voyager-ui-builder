
import React from 'react';
import { useMissions } from '@/contexts/MissionsContext';
import { MissionType } from '@/types/missions';
import { Button } from '@/components/ui/button';

const MissionFilters: React.FC = () => {
  const { filterMissionType, setFilterMissionType, sortOption, setSortOption } = useMissions();
  
  const getMissionTypeColor = (type: MissionType) => {
    switch(type) {
      case MissionType.MainStory_Nexus: return "bg-yellow-500";
      case MissionType.FactionStory_Major: return "bg-blue-500";
      case MissionType.SideQuest_Generic: return "bg-green-500";
      case MissionType.BountyHunt: return "bg-red-500";
      case MissionType.Exploration_Survey: return "bg-teal-500";
      case MissionType.Delivery_Transport: return "bg-orange-500";
      case MissionType.Mining_ResourceCollection: return "bg-zinc-500";
      case MissionType.PersonalCrewQuest: return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };
  
  const handleFilterClick = (type: MissionType | null) => {
    setFilterMissionType(filterMissionType === type ? null : type);
  };
  
  const sortOptions = [
    { value: 'ByDate_Accepted_Newest', label: 'Nejnovější' },
    { value: 'ByDate_Accepted_Oldest', label: 'Nejstarší' },
    { value: 'ByTitle_AZ', label: 'Abecedně (A-Z)' },
    { value: 'ByType', label: 'Podle typu' }
  ];

  return (
    <div className="p-2 border-b border-space-border mb-4">
      <div className="flex flex-wrap gap-2 mb-3">
        <Button
          variant={filterMissionType === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(null)}
          className="text-xs"
        >
          Všechny
        </Button>
        
        <Button
          variant={filterMissionType === MissionType.MainStory_Nexus ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(MissionType.MainStory_Nexus)}
          className="text-xs flex items-center"
        >
          <div className={`w-2 h-2 rounded-full ${getMissionTypeColor(MissionType.MainStory_Nexus)} mr-1`}></div>
          Hlavní příběh
        </Button>
        
        <Button
          variant={filterMissionType === MissionType.FactionStory_Major ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(MissionType.FactionStory_Major)}
          className="text-xs flex items-center"
        >
          <div className={`w-2 h-2 rounded-full ${getMissionTypeColor(MissionType.FactionStory_Major)} mr-1`}></div>
          Frakční příběh
        </Button>
        
        <Button
          variant={filterMissionType === MissionType.BountyHunt ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(MissionType.BountyHunt)}
          className="text-xs flex items-center"
        >
          <div className={`w-2 h-2 rounded-full ${getMissionTypeColor(MissionType.BountyHunt)} mr-1`}></div>
          Odměny
        </Button>
        
        <Button
          variant={filterMissionType === MissionType.Exploration_Survey ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(MissionType.Exploration_Survey)}
          className="text-xs flex items-center"
        >
          <div className={`w-2 h-2 rounded-full ${getMissionTypeColor(MissionType.Exploration_Survey)} mr-1`}></div>
          Průzkum
        </Button>
      </div>
      
      <div className="flex items-center">
        <span className="text-xs text-space-ui-subtext mr-2">Řadit:</span>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-space-dark border border-space-border text-space-ui-text text-xs rounded p-1"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MissionFilters;
