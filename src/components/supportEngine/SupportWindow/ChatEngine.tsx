import React, { useEffect, useState } from "react";
import { ChatEngineWrapper, ChatSocket, ChatFeed } from "react-chat-engine";

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
  const [showChat, setShowChat] = useState(false);
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
      className="transition-5"
      style={{
        height: props.visible ? "100%" : "0%",
        zIndex: props.visible ? "100" : "0",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {showChat && (
        <ChatEngineWrapper>
          {props.user && (
            <ChatSocket
              projectID={import.meta.env.VITE_CE_PROJECT_ID}
              chatID={props.chat.chatID}
              chatAccessKey={props.chat.chatAccessKey}
              senderUsername={props.user.email || ""}
            />
          )}
          <ChatFeed activeChat={props.chat.id} />
        </ChatEngineWrapper>
      )}
    </div>
  );
};
export default ChatEngine;
