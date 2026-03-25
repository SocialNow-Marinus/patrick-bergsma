import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'PLACEHOLDER',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'patrickbergsma-nl.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'patrickbergsma-nl',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'patrickbergsma-nl.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app
