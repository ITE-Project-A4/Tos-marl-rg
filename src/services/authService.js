import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

/**
 * Log an existing user in.
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Register a new user, set their display name, and create their
 * matching Firestore profile document (role defaults to "user").
 */
export async function registerUser({ username, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(credential.user, { displayName: username });

  await setDoc(doc(db, "users", credential.user.uid), {
    userId: credential.user.uid,
    username,
    email,
    role: "user",
    photoURL: "",
    createdAt: serverTimestamp(),
  });

  return credential;
}

export async function logoutUser() {
  return signOut(auth);
}

export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

/** Maps Firebase Auth error codes to short, user-facing messages. */
export function getAuthErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
