import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";
import NoMoreChats from "./NoMoreChats";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { itemsHaveChanged } from "../utils";
class MessageList extends Component {
  render() {
    const {
      sortChats,
      deleteChat,
      handleFetchMore,
      moreChats,
      pageItems
    } = this.props;
    return (
      <div className="main-container">
        <Header />
        <div className="button-container">
          <button
            onClick={sortChats}
            className="sort-button btn btn-primary btn-lg mb-20"
          >
            Sort Chat List
          </button>
        </div>
        <div className="chat-box">
          <InfiniteScroll
            dataLength={pageItems.length}
            next={handleFetchMore}
            hasMore={moreChats}
            loader={<Loading />}
            height={400}
            endMessage={<NoMoreChats />}
          >
            {pageItems.map((chat, index) => (
              <ChatMessage
                key={index}
                chat={chat}
                index={index}
                deleteChat={deleteChat}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default MessageList;
