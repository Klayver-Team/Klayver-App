import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type Session = string | undefined;

type AuthContextValue = {
  session: Session;
  createAnEOA: (email: string, password: string) => Promise<void>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(session: Session) {
  const segments = useSegments();
  const navigate = useNavigation();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/(home)");
    }
  }, [session, segments]);
}

export function AuthProvider(props: any) {
  const [session, setSession] = React.useState<Session>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigation();

  useProtectedRoute(session);

  const createAnEOA = async (email: string, password: string) => {
    if (session) {
      Alert.alert("You already have an account");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
    const retriveAccount = async () => {
      // get current user account address
      const account = await getAccount();
      setSession(account);
    };

    retriveAccount();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        createAnEOA,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
