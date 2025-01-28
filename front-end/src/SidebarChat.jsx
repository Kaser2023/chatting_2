import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import database from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
// import { ref, onValue } from "firebase/database";
import { push } from "firebase/database";
import { Link } from "react-router-dom";
import {  ref, query, orderByChild, onValue } from "firebase/database";


function SidebarChat({ id, name, addNewChat }) {

  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    if (id) {
      // Define the path to messages in the database
      const messagesRef = ref(database, `rooms/${id}/messages`);

      // Create a query to order by timestamp
      const messagesQuery = query(messagesRef, orderByChild("timestamp"));

      // Listen for changes in the messages
      const unsubscribe = onValue(messagesQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert data to an array and sort it in descending order
          const sortedMessages = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .sort((a, b) => b.timestamp - a.timestamp);

          setMessages(sortedMessages);
        } else {
          setMessages([]);
        }
      });

      // Cleanup listener when the component unmounts or `id` changes
      return () => unsubscribe();
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      // Reference to the "rooms" node in Realtime Database
      const roomsRef = ref(database, "rooms");

      // Add a new room with a dynamically generated key
      push(roomsRef, {
        name: roomName,
      })
        .then(() => {
          console.log("Room added successfully!");
        })
        .catch((error) => {
          console.error("Error adding room:", error);
        });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src="https://api.dicebear.com/9.x/bottts/svg" />
        {/* <Avatar src='https://api.dicebear.com/9.x/thumbs/svg?radius=50' /> */}

        <div className="sidebarChat_info">
          <h2> {name} </h2>
          <p>
            {messages[0]?.message}            
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
