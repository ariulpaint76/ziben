import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Use placeholder values during build if env vars are not available
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'placeholder.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'placeholder',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'placeholder.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Only initialize Firebase in browser environment
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  // Initialize services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Initialize Analytics
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
} else {
  // For SSR/Build time, create placeholder instances
  // These won't actually be used during build
  app = null as any;
  auth = null as any;
  db = null as any;
  storage = null as any;
}

export { auth, db, storage, analytics };
export default app;
