const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_REMAZON_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_REMAZON_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_REMAZON_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_REMAZON_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_REMAZON_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_REMAZON_APP_ID
};

export default firebaseConfig;