import React, { useEffect } from 'react';
    import './App.css';
    import Sidebar from './Sidebar';
    import Chat from './Chat';
    import LOOG from './LOOG';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { useStateValue } from './StateProvider';
    import { auth } from './firebase';
    import { actionTypes } from './reducer';

    function App() {
      const [{ user }, dispatch] = useStateValue();

      useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // User is logged in
            dispatch({
              type: actionTypes.SET_USER,
              user: authUser,
            });
          } else {
            // User is logged out
            dispatch({
              type: actionTypes.SET_USER,
              user: null,
            });
          }
        });
      }, [dispatch]);

      return (
        <div className="app">
          {!user ? (
            <LOOG />
          ) : (
            <div className="app_body">
              <Router>
                <Sidebar />
                <Routes>
                  <Route path="/rooms/:roomId" element={<Chat />} />
                  <Route path="/" element={<Chat />} />
                  <Route path="*" element={ <> <Chat /> </> } />
                </Routes>
              </Router>
            </div>
          )}
        </div>
      );
    }

    export default App;
