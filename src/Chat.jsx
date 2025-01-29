import React, { useState, useEffect } from 'react';
    import './Chat.css';
    import { Avatar, IconButton } from '@mui/material';
    import SearchOutlined from '@mui/icons-material/SearchOutlined';
    import AttachFile from '@mui/icons-material/AttachFile';
    import MoreVert from '@mui/icons-material/MoreVert';
    import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
    import MicIcon from '@mui/icons-material/Mic';
    import { useParams } from 'react-router-dom';
    import database from './firebase';
    import { ref, onValue, push, set } from 'firebase/database';
    import { useStateValue } from './StateProvider';
    import { hashString } from './utils';

    function Chat() {
      const [input, setInput] = useState('');
      const [roomName, setRoomName] = useState('');
      const [messages, setMessages] = useState([]);
      const [password, setPassword] = useState('');
      const [passwordPrompt, setPasswordPrompt] = useState(false);
      const [accessGranted, setAccessGranted] = useState(false);
      const { roomId } = useParams();
      const [{ user }] = useStateValue();

      useEffect(() => {
        if (roomId) {
          const roomRef = ref(database, `rooms/${roomId}`);
          onValue(roomRef, (snapshot) => {
            const roomData = snapshot.val();
            if (roomData) {
              setRoomName(roomData.name);
              if (roomData.password) {
                setPasswordPrompt(true);
              } else {
                setAccessGranted(true);
              }
            }
          });

          const messagesRef = ref(database, `rooms/${roomId}/messages`);
          onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
              setMessages(Object.values(messagesData));
            } else {
              setMessages([]);
            }
          });
        }
      }, [roomId]);

      const sendMessage = (e) => {
        e.preventDefault();
        if (input && accessGranted) {
          const messagesRef = ref(database, `rooms/${roomId}/messages`);
          const newMessageRef = push(messagesRef);
          set(newMessageRef, {
            message: input,
            name: user.displayName,
            timestamp: new Date().getTime(),
          });
          setInput('');
        }
      };

      const handlePasswordSubmit = () => {
        const roomRef = ref(database, `rooms/${roomId}`);
        onValue(roomRef, (snapshot) => {
          const roomData = snapshot.val();
          if (roomData && roomData.password) {
            const hashedPassword = hashString(password);
            if (hashedPassword === roomData.password) {
              setAccessGranted(true);
              setPasswordPrompt(false);
            } else {
              alert('Incorrect password');
            }
          }
        });
      };

      if (passwordPrompt) {
        return (
          <div className="chat_p">
            <div className="chat_header_password">
              <div className="chat_headerInfo_password">
                <h3>Enter Password for [ {roomName} ]</h3>
              </div>
            </div>
            <div className="chat_body_password">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='button_name' onClick={handlePasswordSubmit}>Submit</button>
            </div>
          </div>
        );
      }

      if (!accessGranted) {
        return (
          // <div className="chat">
          //   <div className="chat_header">
          //     <div className="chat_headerInfo">
          //       <h3>{roomName}</h3>
          //     </div>
          //   </div>
          //   <div className="chat_body">
          //     <p>Please enter the password to access this room.</p>
          //   </div>
          // </div>

          <div className="chat_password">
            <div className="chat_header_password">
              <div className="chat_headerInfo_password">
                <h3>{roomName}</h3>
              </div>
            </div>
            <div className="chat_body_password">
              <p className="chat_bodyText_password">
                Please enter the password to access this room.
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="chat">
          <div className="chat_header">
            {/* <Avatar /> */}
            <Avatar src="https://api.dicebear.com/9.x/thumbs/svg?radius=50" />
            <div className="chat_headerInfo">
              <h3>{roomName}</h3>

              {/* <p>Last seen at...</p> */}

              <p>
            Last seen {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp
            ).toLocaleTimeString()}
            {/* {new Date(message.timestamp).toLocaleTimeString()} */}

            </p>

            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`chat_message ${
                  message.name === user.displayName && 'chat_receiver'
                }`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </p>
            ))}
          </div>
          <div className="chat_footer">
            <InsertEmoticonIcon sx={{ padding: "10px", color: "gray" }} />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send a message
              </button>
            </form>
            <MicIcon sx={{ padding: "10px", color: "gray" }} />
          </div>
        </div>
      );
    }

    export default Chat;
