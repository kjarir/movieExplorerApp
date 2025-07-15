import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBWjKWxIOHHgcp6tma-_iFX2BY8npYQBXs",
  authDomain: "movieapp-3c30b.firebaseapp.com",
  projectId: "movieapp-3c30b",
  storageBucket: "movieapp-3c30b.firebasestorage.app",
  messagingSenderId: "146321116383",
  appId: "1:146321116383:web:0fc2c3b8f429bf93772d6a",
  measurementId: "G-5DNJXS0FJR",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
