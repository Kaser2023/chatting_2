import React from 'react'
import { Button } from "@mui/material";
import "./LOOG.css";
import { auth, provider } from "./firebase";
import { signInWithPopup,  } from "firebase/auth"; // Firebase v9 modular imports
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function LOOG() {

    const [ {} , dispatch] = useStateValue();

    const signIn = () => { 
        signInWithPopup(auth, provider)
        .then((result) => {

            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
                // photoURL: result.user.photoURL,
            });
          console.log(result); // Handle successful sign-in
        })
        .catch((error) => {
          alert(error.message); // Handle errors
        });
    }

  return (
    <div className='login'>

    <div className="login_container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" 
        alt=""
        />
   
        <div className="login_text">
           <h1>Sign in to WhatsApp</h1>
        </div>
   
        <Button onClick={signIn}>
           
           Sign in with Google

        </Button>
    </div>
   </div>
  )
}

export default LOOG