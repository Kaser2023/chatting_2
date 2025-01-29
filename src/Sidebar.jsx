import React, { useEffect, useState } from 'react';
    import './Sidebar.css';
    import { Avatar, IconButton } from '@mui/material';
    import ChatIcon from '@mui/icons-material/Chat';
    import DonutLargeIcon from '@mui/icons-material/DonutLarge';
    import MoreVertIcon from '@mui/icons-material/MoreVert';
    import SearchIcon from '@mui/icons-material/Search';
    import SidebarChat from './SidebarChat';
    import database from './firebase';
    import { ref, onValue } from 'firebase/database';
    import { useStateValue } from './StateProvider';
    import { auth } from './firebase';
    import { actionTypes } from './reducer';
    import LogoutIcon from '@mui/icons-material/Logout';

    function Sidebar() {
      const [rooms, setRooms] = useState([]);
      const [{ user }, dispatch] = useStateValue();

      useEffect(() => {
        const roomsRef = ref(database, 'rooms');
        const unsubscribe = onValue(roomsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setRooms(
              Object.entries(data).map(([id, room]) => ({
                id,
                ...room,
              }))
            );
          } else {
            setRooms([]);
          }
        });

        return () => unsubscribe();
      }, []);

      const handleLogout = () => {
        auth.signOut()
          .then(() => {
            dispatch({
              type: actionTypes.CLEAR_USER,
            });
          })
          .catch((error) => {
            console.error('Error logging out:', error);
          });
      };

      return (
        <div className="sidebar">
          <div className="sidebar_header">
            <Avatar src={user?.photoURL} />
            <div className="sidebar_headerRight">
              <IconButton>
                {/* <DonutLargeIcon /> */}
                <DonutLargeIcon sx={{ fontSize: "24px !important" }} />
              </IconButton>
              <IconButton>
                {/* <ChatIcon /> */}
                <ChatIcon sx={{ fontSize: "24px !important" }} />
              </IconButton>
              <IconButton>
                {/* <MoreVertIcon   /> */}
                <MoreVertIcon sx={{ fontSize: "24px !important" }} />
              </IconButton>

              {/* <IconButton onClick={handleLogout}>
                <div className="sidebar_headerRight_logout"> Logout</div>
              </IconButton> */}

              {/* <IconButton onClick={handleLogout}>
                <div className="sidebar_headerRight_logout">
                  <LogoutIcon />{" "}
                  <span style={{ fontSize: "small", marginLeft: "5px" }}>
                    Logout
                  </span>
                </div>
              </IconButton> */}

              <IconButton onClick={handleLogout}>
                <div className="sidebar_headerRight_logout">
                  <LogoutIcon />
                  <span style={{ fontSize: "small", marginTop: "5px" }}>
                    Logout
                  </span>
                </div>
              </IconButton>

              
            </div>
          </div>

          <div className="sidebar_search">
            <div className="sidebar_searchContainer">
              {/* <SearchIcon /> */}
              <SearchIcon sx={{ color: "gray", padding: "10px" }} />

              <input placeholder="Search or start new chat" type="text" />
            </div>
          </div>

          <div className="sidebar_chats">
            <SidebarChat addNewChat />
            {rooms.map((room) => (
              <SidebarChat key={room.id} id={room.id} name={room.name} />
            ))}
          </div>
        </div>
      );
    }

    export default Sidebar;
