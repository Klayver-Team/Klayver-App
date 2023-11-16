import { View, Text, Image, TextInput } from "react-native";
import React from "react";

const PurcahseToken = () => {
  return (
    <View className="space-y-[16px] mt-[78px] px-[20px]">
      <View className="item-start space-y-6">
        <Text className="text-zinc-800 text-sm leading-5 w-full">
          Token to purchase
        </Text>
        <View className="bg-white flex-row items-center w-full justify-between gap-5  mx-[2px] pl-6 pr-6 py-3 rounded-3xl max-md:px-5">
          <Text className="text-amber-500 text-base font-bold leading-5">
            AXL
          </Text>
          <Text className="text-neutral-600 text-right text-xl font-bold leading-5 self-stretch whitespace-nowrap">
            10
          </Text>
        </View>
        <View className="justify-center items-center border border-[color:var(--Gray-5,#E0E0E0)] backdrop-blur-[15px] bg-neutral-50 flex-row  rounded-3xl border-solid">
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/01de0394-7b37-4db0-89e5-f6dda86fd85d?apiKey=883c965f5dae4e12bcf3061b7809d46b&",
            }}
            className="aspect-square object-contain object-center w-5 h-5 my-auto"
          />
          <Text className="text-zinc-500 text-sm font-medium leading-8 self-stretch grow shrink basis-auto">
            This depends on selected work hours
          </Text>
        </View>
      </View>

      <View className="item-start space-y-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-zinc-800 text-sm leading-5">Pay with</Text>
          <Text className="text-zinc-800 text-sm leading-5">
            Balance: $50,000
          </Text>
        </View>

        <View className="bg-white flex-row items-center w-full justify-between gap-5  mx-[2px] pl-6 pr-6 py-3 rounded-3xl max-md:px-5">
          <Text className="text-amber-500 text-base font-bold leading-5">
            AXL
          </Text>
          <Text className="text-neutral-600 text-right text-xl font-bold leading-5 self-stretch whitespace-nowrap">
            10
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PurcahseToken;
