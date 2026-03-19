import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';
import { renderApp } from '../main';

export function ChatInput({chatMessages, setChatMessages}) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (isLoading || inputText === ""){
      return ;
    }

    setIsLoading(true);

    const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
          time: dayjs().format('HH:mm')
        }
      ];

    setChatMessages(newChatMessages);
    let input = inputText;
    setInputText('');

    const loadingUID = crypto.randomUUID();
    
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-img" src={LoadingSpinnerImage}/>,
        sender: 'robot',
        id: loadingUID,
        time: dayjs().format('HH:mm')
      }
    ]);

    const response = await Chatbot.getResponseAsync(input); //uses external library
    setIsLoading(false);

    //prev = most up-to-date message list.
    setChatMessages(prev => prev.map(msg => 
      msg.id === loadingUID
        ? {...msg, message: response}
        : msg));

  }

  function resetMessage(){
    setInputText('');
  }

  function handleKeyDown(){
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      resetMessage();
    }
  }

  function clearChat(){
    // localStorage.removeItem('messages');
    localStorage.setItem('messages', JSON.stringify([]));
    renderApp();
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder = "Send a message to the Chatbot" 
        size="30"
        onChange = {saveInputText}
        onKeyDown = {handleKeyDown}
        value={inputText}
        className = "chat-input"
      />
      <button
        onClick={sendMessage}
        className = "send-button"
      >
        Send
      </button>
      <button
        onClick = {clearChat}
        className = "clear-btn">
        Clear
      </button>
    </div>
  );
}