import React, { useEffect, useRef, useState } from 'react';
import { ChatEngineWrapper, Socket, ChatSocket, ChatFeed } from 'react-chat-engine';
import { styles } from '../supportEngine';

interface ChatEngineProps {
  visible: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  chat: {
    id: string;
    chatID: number; 
    chatAccessKey: string; 
  } | null;
}

const ChatEngine: React.FC<ChatEngineProps> = (props) => {
  
     const [showChat,setShowChat] = useState(false)
     useEffect(() => {
        if (props.visible) {
          setTimeout(() => {
            setShowChat(true);
          }, 500);
        }
      }, [props.visible]);
      
    if (!props.visible || !props.user || !props.chat) {
      return null;
    }
  
    return (
      <div
        className='transition-5'
        style={{
          height: props.visible ?'100%':'0%',
          zIndex:props.visible? '100':'0',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
      { showChat &&
          <ChatEngineWrapper>
          {props.user && (
            <ChatSocket
              projectID={import.meta.env.VITE_CE_PROJECT_ID}
              chatID={props.chat.chatID}  
              chatAccessKey={props.chat.chatAccessKey}  
              senderUsername={props.user.email || ''}
              // chatID={222433}
              // chatAccessKey={'ca-af099cc9-5e40-41a2-b50d-0ceef6d22a52'}
              // senderUsername="faizu@gmail.com"

              // userName={props.user.email || ''}
              // userSecret={props.user.email || ''}
            />
          )}
          <ChatFeed activeChat={props.chat.id}/>
        </ChatEngineWrapper>
      }
      </div>
    );
  };
  export default ChatEngine;