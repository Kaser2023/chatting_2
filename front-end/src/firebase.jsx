// import firebase from "firebase";


// // Configuration of the app
// const firebaseConfig = {
//     apiKey: "AIzaSyAoYNcm9cRVW5WgnrnYO0lmAzcfIktV9HA",
//     authDomain: "whatsapp-2-cc0ab.firebaseapp.com",
//     databaseURL: "https://whatsapp-2-cc0ab-default-rtdb.firebaseio.com",
//     projectId: "whatsapp-2-cc0ab",
//     storageBucket: "whatsapp-2-cc0ab.firebasestorage.app",
//     messagingSenderId: "790877364174",
//     appId: "1:790877364174:web:03663e531b90c63834559f"
//   };
//   // 

// // Initialize the app
//   const firebaseApp = firebase.initializeApp(firebaseConfig);

//   // Connect to the database
//   // {firestore} is actually the database of our Firebase. 
//   const db = firebaseApp.firestore();

//   // Connect to the authentication { Handler }
//   const auth = firebase.auth();

//   // Connect to the { Google } authentication provider
//   const provider = new firebase.auth.GoogleAuthProvider();

//   // Export the authentication and the provider
//   export { auth, provider };
//   // Export the database as "Default"
//   // Because we will use it a lot in our app
//   export default db;



// Import Firebase v9 modular SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoYNcm9cRVW5WgnrnYO0lmAzcfIktV9HA",
  authDomain: "whatsapp-2-cc0ab.firebaseapp.com",
  databaseURL: "https://whatsapp-2-cc0ab-default-rtdb.firebaseio.com/",
  projectId: "whatsapp-2-cc0ab",
  storageBucket: "whatsapp-2-cc0ab.firebasestorage.app",
  messagingSenderId: "790877364174",
  appId: "1:790877364174:web:03663e531b90c63834559f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const database = getDatabase(app); // Realtime Database
const auth = getAuth(app); // Authentication
const provider = new GoogleAuthProvider(); // Google Auth Provider
const db = getFirestore(app); // Firestore

// Export the services
export { auth, provider, db };
export default database; // Export Realtime Database as default