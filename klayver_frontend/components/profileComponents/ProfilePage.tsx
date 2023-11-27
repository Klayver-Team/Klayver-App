import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import TaskCard from "../Cards/TaskCard";
import WorkCard from "../Cards/WorkCard";
import ReviewCard from "../Cards/ReviewCard";
import { router } from "expo-router";
import TalentCard from "../Cards/TalentCard";

const WalletPage = () => {
  const style = {};
  return (
    <View>
      <View className="px-[20px] mt-[51px]">
        <View className="flex-row items-center justify-between min-w-full ">
          <View className="flex-row items-start space-x-[16px]">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
              }}
              className="w-[48px] h-[48px] object-contain rounded-[20px]"
            />
            <View className="items-start pt-2">
              <Text className="text-[14px] font-bold text-black">
                0xacel.eth
              </Text>
              <Text className="text-[14px] text-[#BDBDBD] font-normal">
                Blockchain Engineer
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/talentForm")}
            className="py-[5px] px-[10px] border rounded-[20px]"
          >
            <Text className="text-Orange text-[14px] font-medium">
              Edit profile
            </Text>
          </Pressable>
        </View>
        <Text className="text-[15px] font-normal text-[#4F4F4F] mt-[18px]">
          Bringing solutions to complex Web 3 problems with design
        </Text>
      </View>

      {/** Talent Card section */}
      <TalentCard />

      {/** Task section */}
      <View className="mr-[20px] ml-[20px] mt-[22px]">
        <Text className="mb-[18px] text-[18px] font-medium text-black">
          In progress
        </Text>
        <ScrollView
          horizontal
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            width: "96%",
          }}
        >
          <TaskCard />
        </ScrollView>
      </View>

      {/** Works section */}

      <View className="mr-[20px] ml-[20px] mt-[22px] ">
        <Text className="mb-[18px] text-[18px] font-medium text-black">
          Works
        </Text>
        <ScrollView
          horizontal
          style={
            {
              // width: "100%",
            }
          }
          contentContainerStyle={{
            width: "95%",
          }}
        >
          <WorkCard />
        </ScrollView>
      </View>

      {/** Review section */}
      <View className="mr-[20px] ml-[20px] mt-[22px] mb-[99px]">
        <Text className="mb-[18px] text-[18px] font-medium text-black">
          Review
        </Text>
        <ScrollView
          horizontal
          style={
            {
              // width: "100%",
            }
          }
          contentContainerStyle={{
            width: "95%",
          }}
        >
          <ReviewCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default WalletPage;
