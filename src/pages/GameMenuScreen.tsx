
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Navigate } from 'react-router-dom';
import GameMenu from '@/components/game/GameMenu';
import SpaceBackground from '@/components/game/SpaceBackground';

const GameMenuScreen = () => {
  const { isGameStarted } = useGame();

  if (!isGameStarted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SpaceBackground />
      <GameMenu />
    </div>
  );
};

export default GameMenuScreen;
