import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { Chatbot } from 'supersimpledev';
import { ChatMessages } from './components/ChatMessages';
import './App.css';
// import dayjs from 'dayjs';

function App() {

  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) ||
    [
    // {
    //   message: 'hello !',
    //   sender: 'user',
    //   id: 'id1',
    //   time: dayjs().format('HH:mm')
    // },
    // {
    //   message: 'Hello! How can I help you',
    //   sender: 'robot',
    //   id: 'id2',
    //   time: dayjs().format('HH:mm')
    // }
    ]
  );

  useEffect(() => {
    localStorage.setItem('messages',JSON.stringify(chatMessages));
  }, [chatMessages]);
  //save whenever chatMessages changes

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Bye-bye!',
      'give me a uid': function(){
        return `Sure! Here's your UID: ${crypto.randomUUID()}`;
      }
    });
  }, []);
  // [] tells useEffect to only run once. We only want to run
  // this setup code once because we only want to add these
  // extra responses once.

  return (
    <div className="app-container">

      {chatMessages.length === 0 && (
        <p className = "default-message">
          Send a message!
        </p>
        )
      }

      <ChatMessages
        chatMessages = {chatMessages}
      />
      <ChatInput
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
    </div>
  );
}


export default App
