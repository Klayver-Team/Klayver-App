import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { createAccount, getAccount } from "@rly-network/mobile-sdk";
import { Alert } from "react-native";

type Session = string | undefined;

type AuthContextValue = {
  session: Session;
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
      router.replace("/(tabs)/profile")
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/(home)")
    }
  }, [session, segments]);
}

export function Provider(props: any) {
    const [session, setSession] = React.useState<Session>();
    const navigate = useNavigation();
  
    useProtectedRoute(session);

    const createAnEOA = async() => {
        try {
            if(session) return Alert.alert("You already have an account")

            //create an account
            const newAccount = await createAccount();
            setSession(newAccount); 
        } catch (error) {
            Alert.alert("error creating an account")
        } 
    }

    useEffect(() => {
        const retriveAccount = async() => {
            // get current user account address
          const account = await getAccount();
          setSession(account)
        }
    }, [session])
  
    return (
      <AuthContext.Provider
        value={{
          session,
          // Provide other values here
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }