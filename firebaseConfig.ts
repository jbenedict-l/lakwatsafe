import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  // ...other config...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
