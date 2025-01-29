import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LOOG from "./LOOG";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <h1>
          {" "}
          <LOOG />{" "}
        </h1>
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              {/* Route for "/app" */}

              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Chat />
                  </>
                }
              />

              {/* Route for the home page ("/") */}
              <Route
                path="/"
                element={
                  <>
                    <Chat />
                  </>
                }
                // element={<h1>Welcome Home Mewo</h1>}
              />

              
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
              
              {/* Catch-all route for undefined paths */}
              <Route
                path="*"
                element={
                  <>
                    <Chat />
                  </>
                }
              />



            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

{
  /*<Router>
 <Switch>
  <Route path="/app">
    <Sidebar />
    <Chat />
  </Route>

  <Route path="/">
    <h1> Welcome Home Mewo </h1>
  </Route>
</Switch> 
</Router> */
}
