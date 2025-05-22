import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MenuButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  text?: string;
  children?: React.ReactNode;
  to?: string; // Add support for the 'to' prop
}

const MenuButton: React.FC<MenuButtonProps> = ({ 
  onClick, 
  disabled = false, 
  className = "",
  text,
  children,
  to // Add to prop to component parameters
}) => {
  // If 'to' prop is provided, render a Link component
  if (to) {
    return (
      <Button
        asChild
        disabled={disabled}
        className={`w-full py-3 font-pixel text-white bg-space-buttons border border-space-buttons-border 
        hover:bg-space-buttons-hover hover:border-space-buttons-glow transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <Link to={to}>
          {children || text}
        </Link>
      </Button>
    );
  }

  // Otherwise render a regular button
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
