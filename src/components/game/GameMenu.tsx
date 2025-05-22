
import React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';
import GameLogo from './GameLogo';
import VersionInfo from './VersionInfo';

const GameMenu = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      <div className="mb-12">
        <GameLogo />
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
        <MenuButton to="/galaxy-map">Galaktická Mapa</MenuButton>
        <MenuButton to="/ship-details">Detaily Lodi</MenuButton>
        <MenuButton to="/inventory">Inventář</MenuButton>
        <MenuButton to="/research">Výzkum</MenuButton>
        <MenuButton to="/mission-log">Misijní Log</MenuButton>
        <MenuButton to="/knowledge-library">Knihovna Znalostí</MenuButton>
        <MenuButton to="/crew">Posádka</MenuButton>
        <MenuButton to="/planetary">Planetární Interakce</MenuButton>
        <MenuButton to="/diplomacy">Diplomacie</MenuButton>
        <MenuButton to="/trade">Obchod</MenuButton>
        <MenuButton to="/crafting">Výroba</MenuButton>
        <MenuButton to="/settings">Nastavení</MenuButton>
        <MenuButton to="/ship-editor">Editor Lodi</MenuButton>
      </div>
      
      <div className="mt-12">
        <VersionInfo />
      </div>
    </div>
  );
};

export default GameMenu;
