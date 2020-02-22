import React from "react";

const style = {
  border: "1px solid #9DBFFA",
  margin: 6,
  padding: 8,
  borderRadius: 5
};
const ChatMessage = ({ chat, deleteChat }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };
  const sentAt = new Intl.DateTimeFormat("en-US", options).format(
    Date.parse(chat.sentAt)
  );

  const handleDelete = event => {
    event.preventDefault();
    // target is the element that triggered the event (e.g., the user clicked on)
    // currentTarget is the element that the event listener is attached to.
    // in this case id is the uuid and name is the content
    deleteChat(event.currentTarget.id, event.currentTarget.name);
  };
  return (
    <div style={style}>
      <button
        style={{ float: "right", cursor: "pointer" }}
        id={chat.uuid}
        name={chat.content}
        className="btn btn-danger btn-sm"
        onClick={handleDelete}
      >
        <b>X</b>
      </button>

      <>
        <img
          src="https://pluspng.com/img-png/user-png-icon-account-avatar-human-male-man-men-people-person-download-svg-download-png-edit-icon-512.png"
          heigth="50"
          className="user-icon"
        />
        <span className="lead">Message From: {chat.senderUuid}</span>
        <blockquote>
          <p style={{ fontStyle: "italic" }}>{chat.content}</p>
          <footer>{sentAt}</footer>
        </blockquote>
      </>
    </div>
  );
};

export default ChatMessage;
