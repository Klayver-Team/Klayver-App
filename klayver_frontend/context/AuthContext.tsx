import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { createAccount, getAccount, permanentlyDeleteAccount } from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import { User as FirebaseAuthUser, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type Session = string | undefined;

type AuthContextValue = {
  session: Session;
  createAnEOA: (email: string, password: string) => Promise<void>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
  },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)/(home)");
    }
  }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);

  useProtectedRoute(session);

  const createAnEOA = async (email: string, password: string) => {
    if (session) {
      Alert.alert("You already have an account");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      if (user) {
        try {
          const newAccount = await createAccount();
          setSession(newAccount);
          if (newAccount) {
            router.push("/(tabs)/(home)");
          }
        } catch (error) {
          Alert.alert("Error creating a new account");
          console.error(error);
        }
      }
    } catch (error) {
      Alert.alert("Error signing up");
      console.error(error);
    }
  };

  useEffect(() => {
    const retrieveAccount = async () => {
      const account = await getAccount();
      setSession(account);
    };

    retrieveAccount();
  }, [session]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
