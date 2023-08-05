import { initializeApp } from "firebase/app";
import { env } from "@/config/env";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { FirebaseOptions } from "firebase/app";
import type { ResponseReturnType, UserReturnType } from "./types";

// Config
const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Initialize app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Create user.
 */
export const create = async (
  email: string,
  password: string,
): Promise<UserReturnType> => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return {
        user: userCredential.user,
      };
    })
    .catch((err) => {
      return { code: err.code, message: err.message };
    });
};

/**
 * Login with email and password.
 */
export const login = async (
  email: string,
  password: string,
): Promise<UserReturnType> => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return {
        user: userCredential.user,
      };
    })
    .catch((err) => {
      return { code: err.code, message: err.message };
    });
};

/**
 * Logout of user Auth instance.
 */
export const logout = async (): Promise<ResponseReturnType> => {
  return await signOut(auth)
    .then(() => {
      return { code: "success", message: "Sign out successful." };
    })
    .catch((err) => {
      return { code: err.code, message: err.message };
    });
};

/**
 * Send reset password email to user account.
 */
export const resetPassword = async (
  email: string,
): Promise<ResponseReturnType> => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        code: "success",
        message: "Password reset link sent successful.",
      };
    })
    .catch((err) => {
      return { code: err.code, message: err.message };
    });
};

/**
 * Available error codes thrown by firebase.
 */
export const authErrorCodes = AuthErrorCodes;
