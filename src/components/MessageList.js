import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import Loading from "./Loading";
import NoMoreChats from "./NoMoreChats";
import InfiniteScroll from "react-infinite-scroll-component";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.pageItems,
      hasMore: this.props.moreChats
    };
  }

  shouldComponentUpdate(nextProps, _) {
    if (nextProps.pageItems !== this.state.items) {
      this.setState({
        items: nextProps.pageItems,
        hasMore: nextProps.moreChats
      });
      return true;
    }
    return false;
  }

  render() {
    const { sortChats, deleteChat } = this.props;
    const { items, hasMore } = this.state;
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
          <InfiniteScroll
            dataLength={items.length}
            next={this.props.handleFetchMore}
            hasMore={hasMore}
            loader={<Loading />}
            height={400}
            endMessage={<NoMoreChats />}
          >
            >
            {items.map((chat, index) => (
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
