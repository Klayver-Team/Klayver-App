import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ethers } from "ethers";
import axios from "axios";
import { useKlayProfile } from "../../utils/KlayverProfile";

const ProfilePage = ({ navigation }: any) => {
  const {
    balance,
    data,
    tokenBalance,
    permanentlyDeleteAccount,
    session,
    setBalance,
    setTokenBalance,
  } = useAuth();
  const { retriveTokens, getToken, tokens, retriveBalance } = useKlayProfile();

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
          retriveBalance()
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, [session]);

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
  }, [session]);

  const transact = [
    {
      icon: "arrow-up",
      name: "Send",
      id: 1,
      action: () => router.push("/sendPage"),
    },
    {
      icon: "arrow-down",
      name: "Receive",
      id: 2,
      action: () => router.push("/receiveDetails"),
    },
    {
      icon: "hand-holding-usd",
      name: "Borrow",
    },
    {
      icon: "hand-holding-heart",
      name: "insurance",
    },
  ];
  return (
    <View className="min-h-screen flex-1 mt-[48px]">
      {/** wallet balance section */}
      <View className="ml-[43px] mr-[42px] flex-row items-center justify-between">
        <View className="space-y-[8px]">
          <Text className="text-[24px] font-bold text-black">
            ${balance ? balance : "0.00"}
          </Text>
          <Text className="text-[14px] text-[#828282] font-normal">
            Wallet Balance
          </Text>
        </View>
        <View className="space-y-[8px] items-center">
          <Text className="text-[24px] font-bold text-black">
            {tokenBalance ? tokenBalance : "0.00"} TLT
          </Text>
          <Text className="text-[14px] text-[#828282] font-normal">
            Talent Token
          </Text>
        </View>
      </View>
      {/** wallet balance section ends */}

      {/** Transaction section */}
      <View className="min-w-full flex-row items-center justify-evenly mt-[68px]">
        {transact.map((item) => (
          <Pressable onPress={item.action} key={item.id}>
            <View key={item.id} className="items-center">
              <TouchableOpacity
                key={item.id}
                className="w-[46px] h-[46px] rounded-full bg-Orange flex-row items-center justify-center px-[9px]"
              >
                <FontAwesome5
                  name={item.icon}
                  size={20}
                  color="#fff"
                  className="mt-[8px] ml-[8px]"
                />
              </TouchableOpacity>
              <Text className="text-[12px] font-normal">{item.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {/** Transaction section end */}

      {/** Your token section */}
      <View className="mt-[115px] mx-[20px]">
        <Pressable
          onPress={permanentlyDeleteAccount}
          className="flex-row items-center min-w-screen rounded-[20px] justify-center bg-red-600 py-[16px]"
        >
          <Text className="text-[14px] text-white font-bold  text-Black">
            Delete Wallet
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfilePage;
