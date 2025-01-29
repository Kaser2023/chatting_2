import React, { useState } from 'react';
    import './SidebarChat.css';
    import { Avatar } from '@mui/material';
    import { Link } from 'react-router-dom';
    import database from './firebase';
    import { ref, push, set } from 'firebase/database';
    import { hashString } from './utils';

    function SidebarChat({ id, name, addNewChat }) {
      const [newRoomName, setNewRoomName] = useState('');
      const [newRoomPassword, setNewRoomPassword] = useState('');

      const createChat = () => {
        if (newRoomName && newRoomPassword) {
          const roomsRef = ref(database, 'rooms');
          const newRoomRef = push(roomsRef);
          const hashedPassword = hashString(newRoomPassword);
          set(newRoomRef, {
            name: newRoomName,
            password: hashedPassword,
          });
          setNewRoomName('');
          setNewRoomPassword('');
        }
      };

      return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
          <div className="sidebarChat">
            {/* <Avatar src="https://api.dicebear.com/9.x/bottts/svg" /> */}
            <Avatar src="https://api.dicebear.com/9.x/bottts/svg" />

            <div className="sidebarChat_info">
              <h2>{name}</h2>

              <p>Last message...</p>
              {/* <p>
                {messages[0]?.message}            
              </p> */}
            </div>
          </div>
        </Link>
      ) : (
        // <div className="sidebarChat">
        //   <h2>Add New Chat</h2>
        //   <input
        //     type="text"
        //     placeholder="Enter room name"
        //     value={newRoomName}
        //     onChange={(e) => setNewRoomName(e.target.value)}
        //   />
        //   <input
        //     type="password"
        //     placeholder="Enter room password"
        //     value={newRoomPassword}
        //     onChange={(e) => setNewRoomPassword(e.target.value)}
        //   />
        //   <button onClick={createChat}>Create</button>
        // </div>
        <div className="sidebarChat_K">
          <h2 className="sidebarChat__title">Add New Chat</h2>
          <input
            className="sidebarChat__input"
            type="text"
            placeholder="Enter chat name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <input
            className="sidebarChat__input"
            type="password"
            placeholder="Enter chat password"
            value={newRoomPassword}
            onChange={(e) => setNewRoomPassword(e.target.value)}
          />
          <button className="sidebarChat__button" onClick={createChat}>
            Create
          </button>
        </div>
      );
    }

    export default SidebarChat;
