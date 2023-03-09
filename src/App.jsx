import { useState } from 'react'
import Connection from './components/Connection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RMA from './components/RMA'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${import.meta.env.VITE_DATABASE_NAME}.firebaseio.com`,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: `G-${import.meta.env.VITE_MEASURMENT_ID}`,
}

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)
export const db = getFirestore(firebase)

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Connection/>} />
          <Route path='/rma' element={<RMA/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
