// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3-Qpn-SbcLhuJrYpYnlPsNGN08ydU3tc",
  authDomain: "gen-lang-client-0633230293.firebaseapp.com",
  projectId: "gen-lang-client-0633230293",
  storageBucket: "gen-lang-client-0633230293.firebasestorage.app",
  messagingSenderId: "941517640152",
  appId: "1:941517640152:web:21a772c6b88dbacfaa22ad",
  measurementId: ""
};

// Initialize Firebase (only if needed)
// Note: This project primarily uses MySQL backend, Firebase is configured but not actively used
// Uncomment the following lines if Firebase features are needed:

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// For now, export null to indicate Firebase is not initialized
export const auth = null;
export const db = null;
