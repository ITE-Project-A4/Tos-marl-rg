// import { createContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../services/firebase";
// import {
//   loginUser,
//   registerUser,
//   logoutUser,
//   resetPassword,
// } from "../services/authService";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);

//       if (user) {
//         const snap = await getDoc(doc(db, "users", user.uid));
//         setRole(snap.exists() ? snap.data().role : "user");
//       } else {
//         setRole(null);
//       }

//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     role,
//     isAdmin: role === "admin",
//     loading,
//     login: loginUser,
//     register: registerUser,
//     logout: logoutUser,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
} from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          setRole(snap.exists() ? snap.data().role : "user");
        } catch (err) {
          // Firestore unreachable (offline, blocked network, bad config, etc).
          // Don't let this hang the app forever — fall back to "user" and
          // let the rest of the app render; individual pages that need
          // Firestore will surface their own errors.
          console.error("Could not load user role:", err);
          setRole("user");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role,
    isAdmin: role === "admin",
    loading,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
