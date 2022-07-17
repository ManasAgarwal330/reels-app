import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    // console.log("logout clicked");
    return auth.signOut();
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
        // console.log("user",user);
      setUser(user);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const store = {
    user,
    logout,
    login,
    signup,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
