"use client";
import { createContext, use, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "@firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  userData: { firstName?: string; lastName?: string } | undefined;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{
    firstName?: string;
    lastName?: string;
  } | undefined>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const data = userDoc.exists() ? userDoc.data() : {};
        const registrationData = (() => {
          try {
            return JSON.parse(
              localStorage.getItem("registrationData") || "{}"
            );
          } catch {
            return {};
          }
        })();

        if (!userDoc.exists()) {
          const { firstName = "", lastName = "" } = registrationData;
          await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email: user.email,
          });
          localStorage.removeItem("registrationData");
        }
        setUserData({ firstName: data?.firstName, lastName: data?.lastName });
        setUser(user);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/");
    } catch (err) {}
  };

  const value = { user, userData, loading, handleLogout };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};