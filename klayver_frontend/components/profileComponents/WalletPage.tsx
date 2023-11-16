import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import axios from "axios";
import { router } from "expo-router";

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

const ProfilePage = ({ navigation }: any) => {
  const [balance, setBalance] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Then use it in your state declaration
  const [data, setData] = useState<DataItem[]>([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1&sparkline=false&price_change_percentage=7d&locale=en&precision=full";
  // let config = {
  //   method: "get",
  //   url: "https://rest.coinapi.io/v1/assets",
  //   headers: {
  //     Accept: "application/json",
  //     "X-CoinAPI-Key": "9F829A7A-85D7-44CD-B057-F5F3724636D2",
  //   },
  // };

  useEffect(() => {
    const getBalance = async () => {
      try {
        axios({
          url: "https://klaytn.blockpi.network/v1/rpc/07bd54cbe6c6101fdf61fcb72dd010fe711bb3a6",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            jsonrpc: "2.0",
            method: "klay_getBalance",
            params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],
            id: 1,
          },
        })
          .then((response) => {
            const balanceHex = response.data.result; // assuming the balance is in the 'result' field
            const balanceKlay = parseInt(balanceHex, 16);
            const balanceUSD = balanceKlay * 0.12; // replace 1 with the current KLAY to USD rate
            const balanceUSDFixed = balanceUSD.toFixed(2); // convert to string with 2 decimal places
            console.log(balanceUSDFixed);
            setBalance(balanceUSDFixed);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, [balance]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

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
      action: () => router.push("/receivePage"),
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
          <Text className="text-[24px] font-bold text-black">${balance}</Text>
          <Text className="text-[14px] text-[#828282] font-normal">
            Wallet Balance
          </Text>
        </View>
        <View className="space-y-[8px] items-center">
          <Text className="text-[24px] font-bold text-black">1000 AXL</Text>
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
        <View className="flex-row items-center min-w-screen justify-between">
          <Text className="text-[14px] font-normal text-Black">
            Your tokens
          </Text>
          <Text className="text-[14px] font-normal text-Orange">See all</Text>
        </View>

        {/** Tokens */}
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color="orange" />
          ) : data.length === 0 ? (
            <View>
              <Text>No token</Text>
            </View>
          ) : (
            // Your existing code to render the data
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 12,
              }}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 45,
              }}
            >
              {data.slice(0, 3).map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between min-w-full"
                >
                  <View className="flex-row items-center space-x-[12px]">
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      className="w-[48px] h-[48px] rounded-full object-contain mt-[20px]"
                    />
                    <View className="items-start">
                      <Text className="text-[16px] font-medium text-Black">
                        {item.name}
                      </Text>
                      <Text className="text-[14px] text-[#828282]">
                        ${item.current_price.toFixed()}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-[16px] font-medium text-Black">
                      10700 {item.symbol.toUpperCase()}
                    </Text>
                    <Text className="text-[14px] text-[#828282]">
                      ${item.current_price.toFixed()}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </>
      </View>
    </View>
  );
};

export default ProfilePage;
