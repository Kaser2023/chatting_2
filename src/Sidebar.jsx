import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Button, IconButton } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import database from "./firebase";
import { db } from "./firebase"; // Import Firestore from your Firebase config
import { collection, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { useStateValue } from "./StateProvider";



function Sidebar() {
  const [rooms, setRooms] = useState([]);
      const [ {user} , dispatch] = useStateValue();
  

  // useEffect( () =>{
  //     database.collection('rooms').onSnapshot( snapshot =>
  //         setRooms(snapshot.docs.map(doc => ({
  //             id: doc.id,
  //             data: doc.data(),
  //         }))
  //         )
  //     );
  // }, [])

//   Second Attempt:
//   useEffect(() => {
//     // Reference to the "rooms" collection
//     const roomsCollectionRef = collection(database, "rooms");

//     // Listen for real-time updates
//     const unsubscribe = onSnapshot(roomsCollectionRef, (snapshot) => {
//       const roomsData = snapshot.docs.map((doc) => ({
//         id: doc.id, // Document ID
//         data: doc.data(), // Document data
//       }));
//       setRooms(roomsData); // Update state with the fetched rooms
//     });

//     // Cleanup function to unsubscribe from the listener
//     return () => unsubscribe();
//   }, []); // Empty dependency array ensures this runs only once on mount


    // Third Attempt: الحمدلله حمدا كثيرا طيبا مباركا فيه - حمدا سرمديا أبديا ملء السموات وملء الأرض وملء ما بينهما وملء ما شئت من شيء بعد

    useEffect(() => {
        // Reference to the "rooms" node in Realtime Database
        const roomsRef = ref(database, "rooms");
    
        // Listen for {{{ real-time }}} updates
        const unsubscribe = onValue(roomsRef, (snapshot) => {
        const roomsData = snapshot.val(); // Get the data as a JSON object
          if (roomsData) {
            // Convert the JSON object into an array of rooms with IDs
            const roomsArray = Object.keys(roomsData).map((key) => ({
              id: key, // Use the key as the ID
              name: roomsData[key].name, // Access the "name" field
            }));
            setRooms(roomsArray); // Update state with the fetched rooms
          } else {
            setRooms([]); // If no data, set rooms to an empty array
          }
        });
    
        // Cleanup function to unsubscribe from the listener
        return () => unsubscribe();
      }, []); // Empty dependency array ensures this runs only once on mount
    


  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />

        <div className="sidebar_headerRight">
          <IconButton>
            {/* <DonutLargeIcon sx={{ marginLeft: "2vw", marginRight:"2vw", fontSize: "24px" }} /> */}
            <DonutLargeIcon sx={{ fontSize: "24px !important" }} />
          </IconButton>

          <IconButton>
            <ChatIcon sx={{ fontSize: "24px !important" }} />
          </IconButton>

          <IconButton>
            <MoreVertIcon sx={{ fontSize: "24px !important" }} />
          </IconButton>
        </div>
      </div>

      {/* sidebar_search */}
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon sx={{ color: "gray", padding: "10px" }} />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />

        {rooms.map((room) => (
          <SidebarChat
           key={room.id} 
          id={room.id} 
          name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
