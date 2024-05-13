import React, { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

// Типы пропсов для TypeScript (если используете JavaScript, можно убрать)
interface HoverEffectProps {
  children: React.ReactNode;
  setIsHovered: (value: boolean) => void;
  className?: string
}

const HoverEffect: React.FC<HoverEffectProps> = (props) => {
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const handelClick = () => {
    if(windowWidth<= 1500){
      setIsHovered(!isHovered)
    }

  }
  const handelHover = (value: boolean) =>{
    props.setIsHovered(value)
    setIsHovered(value)
  }
  return (
    <div
      onMouseEnter={() => { handelHover(true) }}
      onMouseLeave={() => { handelHover(false)}}
      className={props.className || ''}
      onClick={handelClick}
    >
      {props.children}
    </div>
  );
};

export default HoverEffect;
