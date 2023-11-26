import React, { useState } from "react";
import { View, Text} from "react-native";
import { Link,useLocalSearchParams } from "expo-router";
import UsdtIcon from "../assets/icons/usdt.svg";
import EthIcon from "../assets/icons/eth.svg";
import InputField from "../components/Input";
const SenderDetails = () => {
  const params: { currency: string; send: string } = useLocalSearchParams();
  const currency: string = params.currency ?? "";
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  
  return (
    <View className="my-11 mx-7 rounded flex ">
      <Text className="text-3xl mt-10 font-semibold py-10">
        Send
        <View className="py-10 px-2">
          {currency === "USDT" ? <UsdtIcon height={40} /> : <EthIcon />}
        </View>
        {currency}
      </Text>

      <InputField
        label="To"
        value={address}
        setValue={setAddress}
        rightIconText=""
        placeholder="Enter receiver's address"
        iconText="PASTE"
      />

      <InputField
        label="Amount"
        balance="$50,000"
        placeholder={`Enter ${currency} amount`}
        currency={currency}
        value={amount}
        rightIconText=""
        setValue={setAmount}
        iconText="MAX"
      />
      <Link
        href={{
          pathname: "/viewSendTransaction",
          params: {
            currency: currency,
            amount: +amount,
            address: address,
          },
        }}
      >
        <Text className=" m-auto text-[#f8b804] flex text-center text-xl">
          Next
        </Text>
      </Link>
    </View>
  );
};

export default SenderDetails;
