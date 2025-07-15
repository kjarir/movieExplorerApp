import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "Your API key here",
  authDomain: "Your auth domain here",
  projectId: "Your project id here",
  storageBucket: "Your storage bucket here",
  messagingSenderId: "Your messaging sender id here",
  appId: "Your app id here",
  measurementId: "Your measurement id here",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
