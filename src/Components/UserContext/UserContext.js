import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
const auth = getAuth(app);

export const AuthContext = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //user registration
  const UserCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const UserLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    setLoading(true);
    signOut(auth);
  };

  //forgetemail
  const setEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //updatepass
  const updatepass = (newpass) => {
    return updatePassword(auth.currentUser, newpass);
  };

  //userverify
  const userverify = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
    UserCreate,
    UserLogin,
    user,
    logout,
    loading,
    setEmail,
    userverify,
    updatepass,
  };

  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      Unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
