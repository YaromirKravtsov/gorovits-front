import React, { useState } from 'react';

// Типы пропсов для TypeScript (если используете JavaScript, можно убрать)
interface HoverEffectProps {
  children: React.ReactNode;
  setIsHovered: (value: boolean) => void;
}

const HoverEffect: React.FC<HoverEffectProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {setIsHovered(true); props.setIsHovered(true)}}
      onMouseLeave={() => {setIsHovered(false); props.setIsHovered(false)}}
    >
      {props.children}
    </div>
  );
};

export default HoverEffect;
