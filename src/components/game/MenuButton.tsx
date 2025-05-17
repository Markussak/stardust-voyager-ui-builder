
import { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface MenuButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const MenuButton = ({ 
  text, 
  onClick, 
  disabled = false, 
  className = '',
  icon,
  iconPosition = 'left'
}: MenuButtonProps) => {

  const handleClick = () => {
    if (!disabled) {
      // TODO: Add sound effect here
      onClick();
    }
  };

  const handleMouseOver = () => {
    // TODO: Add hover sound effect
  };

  return (
    <button
      className={cn(
        "menu-button w-[200px]",
        disabled && "opacity-50 cursor-not-allowed hover:bg-space-buttons hover:border-space-buttons-border",
        className
      )}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <div>{icon}</div>}
        <span>{text}</span>
        {icon && iconPosition === 'right' && <div>{icon}</div>}
      </div>
    </button>
  );
};

export default MenuButton;
