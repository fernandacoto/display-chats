import React, { Component } from "react";
import { render } from "react-dom";
import "./styles/style.css";
import { removeDuplicatesFromChatList, sortChatListBySentAt } from "./utils";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueChatList: sortChatListBySentAt(
        "asc",
        removeDuplicatesFromChatList()
      ),
      order: "asc"
    };
  }

  handleSort = () => {
    const { order, uniqueChatList } = this.state;
    const newOrder = order === "asc" ? "desc" : "asc";
    const newOrderedUniqueChatList = sortChatListBySentAt(
      newOrder,
      uniqueChatList
    );
    this.setState({
      order: newOrder,
      uniqueChatList: newOrderedUniqueChatList
    });
  };

  handleDelete = (uuid, content) => {
    const newUniqueChatList = this.state.uniqueChatList.filter(
      chat => !(chat.uuid === uuid && chat.content === content)
    );

    this.setState({
      uniqueChatList: newUniqueChatList
    });
  };

  render() {
    return (
      <MessageList
        uniqueChatList={this.state.uniqueChatList}
        sortChats={this.handleSort}
        deleteChat={this.handleDelete}
      />
    );
  }
}

render(<App />, document.getElementById("root"));
