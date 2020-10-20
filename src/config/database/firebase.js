import * as firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };


const firebaseConfig = {
  apiKey: "AIzaSyB07Gpw25c0OxAwo380cjoT7XQ_z5qb14U",
  authDomain: "eldars911-15acb.firebaseapp.com",
  databaseURL: "https://eldars911-15acb.firebaseio.com",
  projectId: "eldars911-15acb",
  storageBucket: "eldars911-15acb.appspot.com",
  messagingSenderId: "486750080639",
  appId: "1:486750080639:web:5a80863ef16b5ce5c1f94a",
  measurementId: "G-JH6JH7PH80"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
