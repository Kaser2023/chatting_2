import React from "react";
import "./Sidebar.css";

import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Button, IconButton } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from "./SidebarChat";




function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />

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
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
  

      </div>

    </div>
  );
}

export default Sidebar;
