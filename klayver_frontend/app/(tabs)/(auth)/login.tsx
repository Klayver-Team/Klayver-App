import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import MetaMask from "../../assets/icons/metamask.svg";
import WalletConnect from "../../assets/icons/walletconnect.svg";
import Coinbase from "../../assets/icons/coinbase.svg";
import RightIcon from "../../assets/icons/rightIcon.svg";
import LeftIcon from "../../assets/icons/leftIcon.svg";
const Card = () => {
  const myButtons = [
    {
      icon: <MetaMask />,
      id: 1,
      title: "MetaMask",
    },
    {
      id: 2,
      icon: <WalletConnect />,
      title: "WalletConnect",
    },
    {
      id: 3,
      icon: <Coinbase />,
      title: "Coinbase Wallet",
    },
  ];
  return (
    <>
      {myButtons.map((item: any) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => console.log("ok")}
            className="bg-[#f4f4f4] rounded-[20px] mt-4 p-5"
          >
            <View className="flex flex-row">
              {item.icon}
              <Text className="font-bold text-lg mt-3 align-middle ml-3 text-center justify-center ">
                {item.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </>
  );
};
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [selectedTab, setSelectedTab] = useState("A");

  return (
    <ScrollView className="bg-[#fff] ">
      <View className="my-11 mx-4 rounded flex ">
        <View className="flex flex-row ml-4 mb-[100px]">
          <LeftIcon />
          <RightIcon style={{ left: -50 }} />
        </View>
        <Text className="text-2xl mb-9 font-semibold">
          Get started with Klayver
        </Text>
        <Text className="text-lg font-light mb-9">
          Log in to experience better way to socialize, work and organize your
          finance
        </Text>

        <View className="bg-[#f4f4f4] p-1 rounded-full mt-3 w-full flex flex-row justify-evenly">
          <Pressable
            onPress={() => setSelectedTab("A")}
            className="w-[180px]"
            style={{
              backgroundColor: selectedTab === "A" ? "#fff" : "transparent",
              padding: 14,
              borderRadius: 100,
            }}
          >
            <Text
              className="text-[16px] text-center"
              style={{ fontWeight: selectedTab === "A" ? "bold" : "normal" }}
            >
              Regular Sign in
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectedTab("B")}
            className="w-[180px]"
            style={{
              backgroundColor: selectedTab === "B" ? "#fff" : "transparent",
              padding: 14,
              borderRadius: 100,
            }}
          >
            <Text
              className="text-[16px] text-center"
              style={{ fontWeight: selectedTab === "B" ? "bold" : "normal" }}
            >
              Connect wallet
            </Text>
          </Pressable>
        </View>
        {selectedTab === "A" ? (
          <>
            <View className="mt-[90px] mb-12">
              <TextInput
                onChangeText={(inputText) => setEmail(inputText)}
                editable={true}
                placeholderTextColor={"#828282"}
                placeholder={"Enter your email"}
                className="text-sm p-8 text-[18px] text-black rounded-[10px] text-break w-full"
                style={{
                  backgroundColor: "#f4f4f4",
                }}
              />
            </View>

            <TouchableHighlight
              className="bg-[#F88908] rounded-[30px] p-1 mt-[10px]"
              onPress={() => console.log("okay")}
            >
              <Text className="text-[#fff] p-3 text-center font-semibold text-[20px]">
                Continue with email
              </Text>
            </TouchableHighlight>
          </>
        ) : (
          <Card />
        )}

        <Text className="text-center px-7 mt-6 font-light">
          By connecting my wallet I accept
          <Text className="text-[#F88908] font-bold"> Klayver's {""}</Text>
          Terms and conditions
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginForm;

