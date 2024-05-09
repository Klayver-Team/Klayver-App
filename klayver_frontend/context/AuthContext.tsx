import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  User as FirebaseAuthUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { ethers } from "ethers";
import { useKlayProfile } from "../utils/KlayverProfile";

type Session = string | undefined;

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

type AuthContextValue = {
  session: Session;
  createAnEOA: (email: string, password: string) => Promise<void>;
  balance: string | undefined;
  tokenBalance: number | undefined;
  data: DataItem[];
  permanentlyDeleteAccount: () => Promise<void>;
  userAcc: never[];
  loading: boolean;
  setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenBalance: React.Dispatch<React.SetStateAction<number | undefined>>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
  },
  balance: undefined,
  tokenBalance: undefined,
  data: [],
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  userAcc: [],
  loading: false,
  setBalance: () => {}, // Add this line
  setIsLoading: () => {}, // Add this line
  setTokenBalance: () => {}, // Add this line
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  // const segments = useSegments();

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === "(auth)";

  //   if (!session && !inAuthGroup) {
  //     router.replace("/(auth)/login");
  //   } else if (session && inAuthGroup) {
  //     router.replace("/(tabs)/(home)");
  //   }
  // }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Then use it in your state declaration
  const [data, setData] = useState<DataItem[]>([]);
  const [tokenBalance, setTokenBalance] = useState<number>();
  console.log("user", session);

  const { retriveData, filterForUser, retriveTokens, getToken, tokens } =
    useKlayProfile();
  const [userAcc, setUserAcc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      retriveData();
      const result = await filterForUser();
      setUserAcc(result);
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1&sparkline=false&price_change_percentage=7d&locale=en&precision=full";

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

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    balance,
    data,
    tokenBalance,
    permanentlyDeleteAccount,
    loading,
    userAcc,
    setBalance,
    setIsLoading,
    setTokenBalance,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
