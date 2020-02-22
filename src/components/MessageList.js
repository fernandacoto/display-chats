import React from "react";
import ChatMessage from "./ChatMessage";
const MessageList = ({ uniqueChatList, sortChats, deleteChat }) => {
  return (
    <div className="main-container">
      <div className="button-container">
        <button
          onClick={sortChats}
          className="sort-button btn btn-primary btn-lg mb-20"
        >
          Sort Chat List
        </button>
      </div>
      <div className="chat-box">
        {uniqueChatList.map((chat, index) => (
          <ChatMessage
            key={index}
            chat={chat}
            index={index}
            deleteChat={deleteChat}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
