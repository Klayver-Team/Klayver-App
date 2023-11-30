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
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Then use it in your state declaration
  const [data, setData] = useState<DataItem[]>([]);
  const [tokenBalance, setTokenBalance] = useState<number>();

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

  const erc20Abi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    // Get the account balance
    "function balanceOf(address) view returns (uint)",
  ];

  async function getERC20Balance(
    userAddress: any,
    tokenContractAddress: any,
    providerUrl: string
  ) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      erc20Abi,
      provider
    );
    const balance = await tokenContract.balanceOf(userAddress);

    // Since ERC20 tokens can have different decimal values, we need to adjust for that
    const decimals = await tokenContract.decimals();
    const adjustedBalance = balance / Math.pow(10, decimals);

    return adjustedBalance;
  }

  async function getKlaytnBalance(userAddress: any, providerUrl: string) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const balance = await provider.getBalance(userAddress);
    const balanceInKlay = ethers.utils.formatEther(balance);

    // Get the current KLAY to USD exchange rate
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=usd"
    );
    const exchangeRate = response.data["klay-token"].usd;

    // Convert the balance to USD and round to two decimal places
    const balanceInUSD = (parseFloat(balanceInKlay) * exchangeRate).toFixed(2);

    return balanceInUSD;
  }

  useEffect(() => {
    const getBalance = async () => {
      if (!session) {
        console.error("Session is not initialized");
        return;
      }
      try {
        getKlaytnBalance(session, "https://api.baobab.klaytn.net:8651")
          .then((balance) => {
            // console.log(balance);
            setBalance(balance);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, [balance, session]);

  useEffect(() => {
    const getBalance = async () => {
      if (!session) {
        console.error("Session is not initialized");
        return;
      }
      try {
        getERC20Balance(session, tokens, "https://api.baobab.klaytn.net:8651")
          .then((balance) => {
            console.log("erc20", balance);
            setTokenBalance(balance);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        retriveTokens();
        getToken();
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, [balance, session]);

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
    const retrieveAccount = async () => {
      const account = await getAccount();
      setSession(account);
    };

    retrieveAccount();
  }, [session]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    balance,
    data,
    tokenBalance,
    permanentlyDeleteAccount,
    loading,
    userAcc,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
