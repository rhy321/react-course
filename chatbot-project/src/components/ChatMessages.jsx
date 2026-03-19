import useAutoScroll from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css';

export function ChatMessages({chatMessages}) {

  const chatMessagesRef = useAutoScroll(chatMessages);

  return(
    <div className="chat-messages-container"
    ref = {chatMessagesRef}>

      {chatMessages.map((chatMsg) => {
        return (
          <ChatMessage
            message = {chatMsg.message}
            sender = {chatMsg.sender}
            key = {chatMsg.id}
            time = {chatMsg.time}
          />
        );
      })}
    </div>
  );
}