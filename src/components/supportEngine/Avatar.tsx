import React, { useState } from 'react';
import { styles } from './supportEngine';

interface AvatarProps {
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        style={{
          ...(styles.avatarHello as React.CSSProperties),
          ...{ opacity: hovered ? '1' : '0'},
        }}
      >
        Hey its admin 👍
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={props.onClick}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? '1px solid #9f0ff' : '4px solid #7a39e0',
        },
        }}
      ></div>
    </div>
  );
};

export default Avatar;