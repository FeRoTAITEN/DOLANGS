"use client";

import React, { useState, CSSProperties, FC, useRef } from 'react';

// Define types for the icon props and component props
type IconComponent = React.FC; // Icon props can be React Functional Components

interface ButtonProps {
  OnIcon: IconComponent;
  OffIcon?: IconComponent;
  style?: CSSProperties;
  onClick?: () => void;
  audioOn?: string; // sound on status on
  audioOff?: string; // sound off status on
}

const Button: FC<ButtonProps> = ({ OnIcon, OffIcon, style, onClick,audioOn,audioOff }) => {
    const [buttonStatus, setButtonStatus] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMicrophone = () => {
    setButtonStatus((prev) => !prev);
    if (onClick) {
        onClick();
        if(audioRef.current){
            audioRef.current.src = buttonStatus ? (audioOff || audioOn) : (audioOn || '');
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1; // Ensure volume is set to max
            audioRef.current.play().then(() => console.log(11))
        }
    } // Call the onClick prop if provided
  };

  return (
    <div
      className={`w-24 h-24 rounded-full icon ${OffIcon ? (buttonStatus ? "on" : "off") : "on"}`}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem"
      }}
      onClick={toggleMicrophone}
    >
    
      {audioOn && <audio id="audioOn" src={audioOn} preload="auto"   ref={audioRef} autoPlay={false}  />}
      {OffIcon ? (buttonStatus ? <OnIcon /> : <OffIcon />) : <OnIcon />}
    </div>
    
  );
};

export default Button;
