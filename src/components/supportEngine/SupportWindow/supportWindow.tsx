import React, { useState } from 'react';
import { styles } from '../supportEngine';
import EmailForm from './EmalForm';
import ChatEngine from './ChatEngine'


interface User {
    id: string;
    email: string; 
  }
  

  
interface SupportWindowProps {
    visible: boolean;
  }
  
  const SupportWindow: React.FC<SupportWindowProps> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [chat, setChat] = useState<any>(null);
    const handleChatResponse = (chatData: any) => {
      console.log('chat Data',chatData);
      
      setChat(chatData);
    };
    return (
      <div
        style={{
          ...(styles.supportWindow as React.CSSProperties),
          ...{ opacity: props.visible ? '1' : '0' },
        }}
      >
         <EmailForm setUser={(user) => setUser(user)} setChat={handleChatResponse} visible={user === null || chat === null} />
      {user !== null && chat !== null && (
        <ChatEngine visible={true} chat={chat} user={user}  />
      )}
      </div>
    );
  };
  
  
export default SupportWindow;