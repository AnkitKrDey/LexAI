import { createContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth, googleProvider } from '@/lib/firebase';
import { api, apiErrorMessage, setTokenProvider } from '@/lib/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTokenProvider(async () => {
      if (!auth.currentUser) return null;
      return auth.currentUser.getIdToken();
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const verifyRes = await api.post('/auth/verify');
        setProfile(verifyRes.data.user);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signup = async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }
    await api.post('/auth/register', { name });
    const verifyRes = await api.post('/auth/verify');
    setProfile(verifyRes.data.user);
    return credential.user;
  };

  const login = async ({ email, password }) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await api.post('/auth/verify');
    return credential.user;
  };

  const loginWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    await api.post('/auth/register', { name: credential.user.displayName });
    const verifyRes = await api.post('/auth/verify');
    setProfile(verifyRes.data.user);
    return credential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login,
      signup,
      loginWithGoogle,
      logout,
      getErrorMessage: apiErrorMessage,
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
