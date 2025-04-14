"use client";
// ------------ Hooks ----------------
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// ------------ Firebase ----------------
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
// ------------ Types ----------------
import { createContext } from "react";
import { AuthContextProps } from "@/types";
import type { User } from "@firebase/auth";

// Create context with undefined default value and proper TypeScript type
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Provides authentication context to the application with:
 * - User state management
 * - Firestore data synchronization
 * - Authentication state persistence
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ firstName?: string; lastName?: string } | undefined>();
  const [loading, setLoading] = useState(true); // Initial loading state
  const [callbackUrl, setCallbackUrl ] = useState('');

  const router = useRouter();

  /**
   * Effect hook to manage authentication state changes
   * - Subscribes to Firebase auth state changes
   * - Handles user data synchronization with Firestore
   * - Manages JWT token storage
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        try {
          // Get user document from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const data = userDoc.exists() ? userDoc.data() : {};
          
          // Retrieve registration data from localStorage if available
          const registrationData = (() => {
            try {
              return JSON.parse(localStorage.getItem("registrationData") || "{}");
            } catch {
              return {};
            }
          })();

          // Create new user document if doesn't exist
          if (!userDoc.exists()) {
            const { firstName = "", lastName = "" } = registrationData;
            await setDoc(doc(db, "users", user.uid), {
              firstName,
              lastName,
              email: user.email,
            });
            localStorage.removeItem("registrationData");
          }

          // Update state with user data
          setUserData({ 
            firstName: data?.firstName, 
            lastName: data?.lastName 
          });
          setUser(user);
          
          // Store authentication token
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Error processing user data:", error);
        }
      } else {
        // Clear user state if not authenticated
        setUser(null);
        setUserData(undefined);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  /**
   * Handles user logout
   * - Signs out from Firebase
   * - Clears local storage
   * - Redirects to home page
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Context value containing all auth-related data and methods
  const value = { 
    user, 
    userData, 
    loading, 
    callbackUrl,
    setCallbackUrl,
    handleLogout 
  };

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

/**
 * Custom hook to access authentication context
 * 
 * @returns {AuthContextProps} Authentication context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};