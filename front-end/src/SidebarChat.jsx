import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';

function SidebarChat({ addNewChat }) {
  

const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      // do some clever database stuff
    }
  }



return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src='https://api.dicebear.com/9.x/bottts/svg' />
      {/* <Avatar src='https://api.dicebear.com/9.x/thumbs/svg?radius=50' /> */}

      <div className="sidebarChat_info">
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
        <h2>Add new Chat</h2>
    </div>
  ) ; 
}

export default SidebarChat
