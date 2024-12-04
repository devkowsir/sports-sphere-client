import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const googleAuthProvider = new GoogleAuthProvider();

/**
 * @typedef AuthContextData
 * @property {{displayName: string; email: string; photoURL: string} | null} user
 * @property {boolean} isLoading
 * @property {authMethods.registerUser} registerUser
 * @property {authMethods.loginUser} loginUser
 * @property {authMethods.loginWithGoogle} loginWithGoogle
 * @property {authMethods.sendPasswordResetEmail} sendPasswordResetEmail
 * @property {authMethods.logout} logout
 */

const AuthContext = createContext();

export const useAuthContext = () => {
  /** @type {AuthContextData | undefined} */
  const data = useContext(AuthContext);
  if (!data) throw new Error("Cannot Use Auth Context Outside It's Provider.");

  return data;
};

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const reloadUser = () => {
    setCurrentUser({
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
  };

  const authContextData = { user: currentUser, isLoading, reloadUser, ...authMethods };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

const authMethods = {
  registerUser: ({ email, password }) => createUserWithEmailAndPassword(auth, email, password),
  updateProfile: (data) => updateProfile(auth.currentUser, data),
  loginUser: ({ email, password }) => signInWithEmailAndPassword(auth, email, password),
  loginWithGoogle: () => signInWithPopup(auth, googleAuthProvider),
  sendPasswordResetEmail: (email) => sendPasswordResetEmail(auth, email),
  logout: () => signOut(auth),
};
