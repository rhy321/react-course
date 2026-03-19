import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user1.png';
import './ChatMessage.css';
// import dayjs from 'dayjs';

console.log(UserProfileImage);

export function ChatMessage({message, sender, time}) {

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage}
        className="chat-msg-profile"/>
      )}
      <div className='chat-message-text'>
        {message}
        <div className = "time">
         {time}
        </div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage}
        className="chat-msg-profile"/>
      )}
    </div>
  );
}