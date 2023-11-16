import { View, Text } from "react-native";
import React from "react";

const OrderSummary = () => {
  return (
    <View className="bg-white flex flex-col items-stretch px-6 rounded-3xl max-md:px-5 mx-[20px] mt-[53px]">
      <View className="justify-between flex-row items-center gap-5 mt-6">
        <Text className="text-zinc-500 text-base font-medium leading-5">
          Talent
        </Text>
        <Text className="text-zinc-800 text-right text-base font-medium leading-6 self-stretch whitespace-nowrap">
          0xacel
        </Text>
      </View>
      <View className="justify-between flex-row items-center gap-5 mt-8">
        <Text className="text-zinc-500 text-base font-medium leading-5">
          Hours
        </Text>
        <Text className="text-zinc-800 text-right text-base font-medium leading-6 self-stretch whitespace-nowrap">
          10 hours
        </Text>
      </View>

      <Text className="text-zinc-500 text-base font-medium leading-5 whitespace-nowrap mt-8">
        Description
      </Text>

      <Text className="text-zinc-800 text-base leading-6 mt-2.5">
        Join us and shape the blockchain future. Responsibilities include
        developing blockchain apps and smart contracts, ensuring security and
        innovation, and collaborating with cross-functional teams.
      </Text>

      <View className="flex-row items-center justify-between gap-5 mt-8 mb-4 w-full">
        <View>
          <Text className="text-zinc-500 text-base font-medium leading-5">
            Cost
          </Text>
        </View>
        <View className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <View>
            <Text className="text-zinc-800 text-right text-base font-medium leading-6 whitespace-nowrap">
              10 AXL
            </Text>
          </View>
          <Text className="text-zinc-500 text-right text-sm leading-5 whitespace-nowrap mt-1">
            = $10
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
