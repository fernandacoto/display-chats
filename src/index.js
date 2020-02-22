import React, { Component } from "react";
import { render } from "react-dom";
import "./styles/style.css";
import { removeDuplicatesFromChatList, sortChatListBySentAt } from "./utils";
import MessageList from "./components/MessageList";

const ITEMSPERPAGE = 5;
class App extends Component {
  constructor(props) {
    super(props);
    const initialUniqueChatList = sortChatListBySentAt(
      "asc",
      removeDuplicatesFromChatList()
    );
    this.state = {
      uniqueChatList: initialUniqueChatList,
      order: "asc",
      startAtPosition: 0,
      endAtPosition: ITEMSPERPAGE,
      pageItems: initialUniqueChatList.slice(0, ITEMSPERPAGE),
      moreChats: initialUniqueChatList.length > 0
    };
  }

  handleSort = () => {
    const { order, uniqueChatList, endAtPosition } = this.state;
    const newOrder = order === "asc" ? "desc" : "asc";
    const newOrderedUniqueChatList = sortChatListBySentAt(
      newOrder,
      uniqueChatList
    );
    this.setState({
      order: newOrder,
      uniqueChatList: newOrderedUniqueChatList,
      pageItems: newOrderedUniqueChatList.slice(0, endAtPosition)
    });
  };

  handleDelete = (uuid, content) => {
    const newUniqueChatList = this.state.uniqueChatList.filter(
      chat => !(chat.uuid === uuid && chat.content === content)
    );

    this.setState({
      uniqueChatList: newUniqueChatList,
      pageItems: newUniqueChatList.slice(0, this.state.endAtPosition)
    });
  };

  handleFetchMore = () => {
    setTimeout(() => {
      const { endAtPosition, uniqueChatList } = this.state;
      const newStartAtPosition = endAtPosition;
      const newEndAtPosition = newStartAtPosition + ITEMSPERPAGE;
      const newPageItems = uniqueChatList.slice(0, newEndAtPosition);
      const newHasMore =
        uniqueChatList.slice(newStartAtPosition, newEndAtPosition).length ===
        ITEMSPERPAGE;
      this.setState({
        startAtPosition: newStartAtPosition,
        endAtPosition: newEndAtPosition,
        pageItems: newPageItems,
        moreChats: newHasMore
      });
    }, 2000);
  };

  render() {
    return (
      <MessageList
        sortChats={this.handleSort}
        deleteChat={this.handleDelete}
        pageItems={this.state.pageItems}
        handleFetchMore={this.handleFetchMore}
        moreChats={this.state.moreChats}
      />
    );
  }
}

render(<App />, document.getElementById("root"));
