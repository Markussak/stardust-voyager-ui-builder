
import React from 'react';
import StartMenu from '@/components/game/StartMenu';
import SpaceBackground from '@/components/game/SpaceBackground';

const Index = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SpaceBackground />
      <StartMenu />
    </div>
  );
};

export default Index;
