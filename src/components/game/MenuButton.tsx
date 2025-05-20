
import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ 
  onClick, 
  disabled = false, 
  className = "",
  text,
  children
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
      hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children || text}
    </Button>
  );
};

export default MenuButton;
