// import React from 'react';
import "./Chat.css";

import React, { useEffect, useState } from "react";

import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { Button } from "@mui/material";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useParams } from "react-router-dom";
import database from "./firebase";
// import { ref, onValue } from "firebase/database"; // Firebase v9 modular imports
import { ref, onValue, query, orderByChild, onChildAdded } from "firebase/database";
import { useStateValue } from "./StateProvider";
import { Firestore } from "firebase/firestore";
import { getDatabase, push, serverTimestamp } from "firebase/database"; // Firebase Realtime Database




function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [ {user} , dispatch] = useStateValue();
  


  //   useEffect(() => {
  //     if (roomId) {
  //       database
  //         .collection("rooms")
  //         .doc(roomId)
  //         .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
  //     }
  //   }, [roomId]);

  useEffect(() => {
    if (roomId) {

    // Reset messages when a new room is selected
      setMessages([]);
      // Reference to the specific room in the "rooms" node
      const roomRef = ref(database, `rooms/${roomId}`);

      // Set up a real-time listener for the room
      const unsubscribe = onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val(); // Get the data as a JSON object

        if (roomData) {
          setRoomName(roomData.name); // Update room name
        } else {
          console.log("Room not found!");
          setRoomName(""); // Clear room name if the room doesn't exist
        }
      });

    //   database
    //     .collection("rooms")
    //     .doc(roomId)
    //     .collection("messages")
    //     .orderBy("timestamp", "asc")
    //     .onSnapshot((snapshot) => {
    //       setMessages(snapshot.docs.map((doc) => doc.data()));
    //     });

    
      // Reference to the "messages" node inside the room
      const messagesRef = ref(database, `rooms/${roomId}/messages`);

      // Query messages ordered by "timestamp"
      const messagesQuery = query(messagesRef, orderByChild("timestamp"));

      // Set up a real-time listener for messages
      const unsubscribeMessages = onChildAdded(messagesQuery, (snapshot) => {
        const messageData = snapshot.val(); // Get the message data
        setMessages((prevMessages) => [...prevMessages, messageData]); // Add new message to the list
      });


      // Clean up the listener on unmount
      return () => { 
        unsubscribe();
        unsubscribeMessages();

      }
    }
  }, [roomId]);

  const sendMessage = (e) => {
    // database.collection("rooms")
    // .doc(roomId).collection("messages").add({
    //     message: input,
    //     name: user.displayName,
    //     timestamp: Firestore.fieldValue.serverTimestamp(),
    // })

    e.preventDefault(); // Prevent page refresh
    console.log("You typed >>>", input);

    if (!roomId || !input.trim()) {
      console.error("Room ID or input is missing");
      return;
    }

    // Define the path for the messages
    const messagesRef = ref(database, `rooms/${roomId}/messages`);

    // Add a new message to the room
    push(messagesRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    })
      .then(() => console.log("Message sent successfully"))
      .catch((error) => console.error("Error sending message:", error));

    setInput("");
  };



  return (
    <div className="chat">
      {/* chat_header */}
      <div className="chat_header">
        {/* <Avatar /> */}
        {/* <Avatar src='https://api.dicebear.com/9.x/bottts/svg' /> */}
        <Avatar src="https://api.dicebear.com/9.x/thumbs/svg?radius=50" />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp
            ).toLocaleString()}
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon
            // sx={{ marginRight: "2vw", fontSize: "24px" }}
            />
          </IconButton>

          <IconButton>
            <AttachFileOutlinedIcon
            // sx={{  marginRight: "2vw", fontSize: "24px" }}
            />
          </IconButton>

          <IconButton>
            <MoreVertIcon
            // sx={{  fontSize: "24px" }}
            />
          </IconButton>
        </div>
      </div>

      {/* chat_body */}
      <div className="chat_body">
        {/* {messages.map((message) => {
              <p
                key={message.key}
                className={`chat_message ${message.received && "chat_receiver"}`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">{message.timestamp}</span>
              </p>;
            })} */}

        {/* {messages.map((message) => (
              <p
                key={message.key} // Ensure each message has a unique key
                className={`chat_message ${message.received && "chat_receiver"}`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">{message.timestamp}</span>
              </p>
            ))} */}

        {messages.map((message, index) => (
             <p
             key={index}
             // key={message.key} // Ensure each message has a unique key
             className={`chat_message ${
                message.name === user.displayName
                 && 
                 "chat_receiver"} `}
           >
             <span className="chat_name">{message.name}</span>
             {message.message}
             <span className="chat_timestamp">(at {new Date(message.timestamp).toLocaleString()})</span>
           </p>
        ))}


       
{/* 
        <p
          // key={message.key} // Ensure each message has a unique key
          className={`chat_message `}
        >
          <span className="chat_name">Mewo</span>
          message Hi
          <span className="chat_timestamp">12:9pm</span>
        </p> */}


      </div>

      {/* chat_footer */}

      <div className="chat_footer">
        <InsertEmoticonOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>

        <MicOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
      </div>

      {/* <div className="chat_footer">
            <InsertEmoticonOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send a message
              </button>
            </form>
    
            <MicOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
          </div> */}
    </div>
  );
}

export default Chat;
