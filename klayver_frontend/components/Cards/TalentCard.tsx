import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TalentCard = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/beec9120-f379-4d52-a5ff-a9b115c45ea5?apiKey=883c965f5dae4e12bcf3061b7809d46b&width=100 100w",
      }}
      className="aspect-[2.81] object-cover mt-5  w-[342px] rounded-[20px] overflow-hidden pt-[21px] px-[22px] ml-[20px] mr-[21px]"
    >
      <View className="flex-row items-start space-x-4">
        <View className="w-[64px] h-[64px] bg-white " />
        <View className="space-y-[19px]">
          <View className="flex-row items-start w-full space-x-4">
            <Text className="text-white text-base font-bold leading-5 my-auto">
              Verified Talent
            </Text>
            <Text className="text-white text-sm leading-5 whitespace-nowrap justify-center items-stretch bg-neutral-200/20 bg-opacity-20 px-2 py-[0.5] rounded-3xl">
              $10/hr
            </Text>
          </View>
          {/**
           */}
          <View className="flex-row items-start gap-x-5">
            <View className="items-start">
              <Text className="text-white text-sm font-bold leading-5 whitespace-nowrap">
                20
              </Text>
              <Text className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
                Total Jobs
              </Text>
            </View>
            <View className="items-start">
              <Text className="text-white text-sm font-bold leading-5 whitespace-nowrap">
                20
              </Text>
              <Text className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
                Total Hours
              </Text>
            </View>
            <View className="items-start">
              <Text className="text-white text-sm font-bold leading-5 whitespace-nowrap">
                1 AXL
              </Text>
              <Text className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
                = $10
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TalentCard;

function MyComponent() {
  return (
    <View className=" flex flex-row">
      <View className="items-center flex w-full justify-between gap-2.5 pr-2.5">
        <View className="text-white text-base font-bold leading-5 my-auto">
          <Text>Verified Talent</Text>
        </View>
        <View></View>
      </View>
      <View className="items-stretch flex-row">
        <View className="items-stretch flex grow basis-[0%] flex-col">
          <View className="text-white text-sm font-bold leading-5 whitespace-nowrap">
            <Text>20</Text>
          </View>
          <View className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
            <Text>Total Jobs</Text>
          </View>
        </View>
        <View className="items-stretch flex grow basis-[0%] flex-col">
          <View className="text-white text-sm font-bold leading-5 whitespace-nowrap">
            <Text>320</Text>
          </View>
          <View className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
            <Text>Total Hours</Text>
          </View>
        </View>
        <View className="items-stretch flex grow basis-[0%] flex-col">
          <View className="text-white text-sm font-bold leading-5 whitespace-nowrap">
            <Text>1 AXL</Text>
          </View>
          <View className="text-zinc-100 text-xs leading-5 whitespace-nowrap mt-1">
            <Text>= $10</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
