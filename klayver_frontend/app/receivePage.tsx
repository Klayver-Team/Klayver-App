import React from "react";
import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import UsdtIcon from "../assets/icons/usdt.svg";
import EthIcon from "../assets/icons/eth.svg";
import { Image } from "react-native-svg";
import { Link, router } from "expo-router";
import { useLinkProps, useNavigation } from "@react-navigation/native";

const ReceiveMoney = () => {
  const tokenList = [
    {
      icon: <UsdtIcon height={50} width={40} />,
      text: "USDT",
      amount: "10700",
      value: "$50,000",
      rate: "$1",
      id: 1,
      currency: "USDT",
      otherText: "polygon",
    },
    {
      icon: <EthIcon height={50} width={40} />,
      text: "Ethereum",
      amount: "12",
      id: 2,
      value: "$3,500",
      rate: "$1",
      currency: "ETH",
      otherText: "",
    },
  ];

  return (
    <View className="my-11 mx-7 rounded flex ">
      <Text className="text-3xl mt-10 font-semibold py-10">Select Token</Text>
      {tokenList.map((item) => (
        <Pressable
          key={item.id}
          className="bg-[#fff] px-3 pt-6 mb-3 flex-row rounded-[20px]"
        >
          <Link
            href={{
              pathname: "/receiveDetails",
              params: {
                currency: item.currency,
                otherText: item.otherText,
              },
            }}
          >
            <View className="flex flex-row">
              {item.icon}
              <View className="flex flex-col justify-between w-[300px] ">
                <View className="flex flex-row px-2 justify-between gap-3">
                  <View className="flex flex-row">
                    <Text className="font-semibold text-xl text">
                      {item.text}
                    </Text>
                    <>
                      {item.otherText.length !== 0 && (
                        <View className="bg-[#EAEAEA] mx-1 flex flex-row rounded-full px-2 py-1 ">
                          <Text className="text-[#828282] font-semibold">
                            {item.otherText.toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </>
                  </View>
                  <Text className="font-bold text-xl">
                    {item.amount} {item.currency}
                  </Text>
                </View>

                <View className="px-1 py-1 flex-row justify-between">
                  <Text className="text-[#828282] text-lg font-semibold">
                    {item.rate}
                  </Text>
                  <Text className="text-[#828282] text-xl font-semibold">
                    {item.value}
                  </Text>
                </View>
              </View>
            </View>
          </Link>
        </Pressable>
      ))}
    </View>
  );
};

export default ReceiveMoney;
