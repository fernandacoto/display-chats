import { messages } from "./data/data.json";

export const removeDuplicatesFromChatList = () => {
  return messages.filter(
    (chat, index, listWithDupChats) =>
      listWithDupChats.findIndex(
        message =>
          message.uuid === chat.uuid && message.content === chat.content
      ) === index
  );
};

export const sortChatListBySentAt = (order, messageList) => {
  let newMessageList = [...messageList];
  if (order === "asc") {
    newMessageList.sort((a, b) =>
      Date.parse(a.sentAt) > Date.parse(b.sentAt) ? 1 : -1
    );
  } else {
    newMessageList.sort((a, b) =>
      Date.parse(a.sentAt) < Date.parse(b.sentAt) ? 1 : -1
    );
  }
  return newMessageList;
};
