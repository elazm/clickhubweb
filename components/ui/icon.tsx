import { Lineicons } from '@lineiconshq/react-lineicons';
import type { IconData } from '@lineiconshq/react-lineicons/dist/LineIcon';

interface IconProps {
  icon: IconData;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ icon, size = 20, color = 'currentColor', strokeWidth, className }: IconProps) {
  return (
    <Lineicons
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}
