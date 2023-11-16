import React, { useState } from "react";
import { View, Text, Button, TouchableOpacityComponent } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link, router, useLocalSearchParams } from "expo-router";
import UsdtIcon from "../assets/icons/usdt.svg";
import EthIcon from "../assets/icons/eth.svg";
import InputField from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Barcode from "../assets/icons/barcode.svg";
import QRCode from "react-native-qrcode-svg";
import CopyIcon from "../assets/icons/Frame.svg";
import { SafeAreaView } from "react-native-safe-area-context";
const ReceiveDetails = () => {
  const params: { currency: string; send: string } = useLocalSearchParams();
  const currency: string = params.currency ?? "";
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const send = params.send;
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 43 }}>
      <View className="flex-row space-x-3 items-center justify-center">
        <Text>
          {" "}
          {currency === "USDT" ? (
            <UsdtIcon height={24} />
          ) : (
            <EthIcon height={24} width={24} />
          )}
        </Text>
        <Text className="text-[16px] font-bold">USDT</Text>
      </View>

      <View className="flex flex-col mt-[40px] justify-center">
        <View className="flex m-auto">
          <QRCode
            value="0x5407b52aAcf58cb5CE8638caa26Dc1Ec76cb4b53"
            size={212}
          />
        </View>

        <TouchableOpacity className="bg-[#fff] px-3 py-3 mb-3 gap-3 mt-4 rounded-[20px] flex flex-col">
          <Text className="text-xl text-[#828282] font-semibold">
            Wallet address
          </Text>
          <View className="flex flex-row mr-3">
            <Text className="text-[16px] font-[400] w-[90%] mr-3">
              0x5407b52aAcf58cb5CE8638caa26Dc1Ec76cb4b5312
            </Text>
            <CopyIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#fff] px-3 py-3 mb-3 gap-3 mt-4 rounded-[20px] flex flex-col">
          <Text className="text-[14px]">
            • You are about to credit your wallet with
            <Text className="font-bold">{` ${currency}`}</Text>
          </Text>
          <Text className="text-[14px]">
            • Send only<Text className="font-bold">{` ${currency}`}</Text> to
            this address, sending assets other than{" "}
            <Text className="font-bold">{`${currency}`}</Text> to this address
            or to a different network will result in the loss of your deposit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReceiveDetails;
