import React, { useState } from 'react';

// Типы пропсов для TypeScript (если используете JavaScript, можно убрать)
interface HoverEffectProps {
  children: React.ReactNode;
  setIsHovered: (value: boolean) => void;
  className?: string
}

const HoverEffect: React.FC<HoverEffectProps> = (props) => {


  return (
    <div 
      onMouseEnter={() => {props.setIsHovered(true); props.setIsHovered(true)}}
      onMouseLeave={() => {props.setIsHovered(false); props.setIsHovered(false)}}
      className = {props.className||''}
    >
      {props.children}
    </div>
  );
};

export default HoverEffect;
