import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/config/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    return firebaseSignOut(auth)
  }

  return { user, loading, signIn, signOut, isAuthenticated: !!user }
}
