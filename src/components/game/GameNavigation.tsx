
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Map, Package, Book, ChevronRight, Users, FileText, LogOut, Tool, Settings, ShoppingCart, Globe, Flask, Sword, Ship } from 'lucide-react';

const GameNavigation: React.FC = () => {
  const { isGameStarted, exitGame } = useGame();
  const location = useLocation();

  if (!isGameStarted) {
    return null; // Don't show navigation if game hasn't started
  }

  return (
    <div className="fixed top-0 left-0 w-full z-20 bg-space-dark/80 backdrop-blur-sm border-b border-space-border">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          <Button
            variant={location.pathname === '/galaxy-map' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/galaxy-map">
              <Map className="h-4 w-4 mr-1" />
              Mapa
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/inventory' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/inventory">
              <Package className="h-4 w-4 mr-1" />
              Inventář
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/mission-log' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/mission-log">
              <FileText className="h-4 w-4 mr-1" />
              Mise
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/research' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/research">
              <Flask className="h-4 w-4 mr-1" />
              Výzkum
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/knowledge-library' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/knowledge-library">
              <Book className="h-4 w-4 mr-1" />
              Kodex
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/diplomacy' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/diplomacy">
              <Users className="h-4 w-4 mr-1" />
              Diplomacie
            </Link>
          </Button>

          <Button
            variant={location.pathname === '/ship-details' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/ship-details">
              <Ship className="h-4 w-4 mr-1" />
              Loď
            </Link>
          </Button>
          
          <Button
            variant={location.pathname === '/planetary' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/planetary">
              <Globe className="h-4 w-4 mr-1" />
              Planety
            </Link>
          </Button>

          <Button
            variant={location.pathname === '/crafting' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/crafting">
              <Tool className="h-4 w-4 mr-1" />
              Výroba
            </Link>
          </Button>

          <Button
            variant={location.pathname === '/trade' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/trade">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Obchod
            </Link>
          </Button>

          <Button
            variant={location.pathname === '/crew' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/crew">
              <Users className="h-4 w-4 mr-1" />
              Posádka
            </Link>
          </Button>

          <Button
            variant={location.pathname === '/ship-editor' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/ship-editor">
              <Settings className="h-4 w-4 mr-1" />
              Editor
            </Link>
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost" 
            size="sm"
            asChild
          >
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-1" />
              Nastavení
            </Link>
          </Button>

          <Button
            variant="ghost" 
            size="sm"
            onClick={() => exitGame()}
            asChild
          >
            <Link to="/">
              <LogOut className="h-4 w-4 mr-1" />
              Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameNavigation;
