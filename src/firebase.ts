import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiZj4jg8ETzPXshAw0x5I8VuLoOCANdrc",
  authDomain: "todo-app-b0cc3.firebaseapp.com",
  projectId: "todo-app-b0cc3",
  storageBucket: "todo-app-b0cc3.firebasestorage.app",
  messagingSenderId: "777479335065",
  appId: "1:777479335065:web:a318ff95b6eda504f6dc08",
  measurementId: "G-J1F4N1Q4EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
