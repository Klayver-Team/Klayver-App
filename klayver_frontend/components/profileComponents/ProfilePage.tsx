import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import TaskCard from "../Cards/TaskCard";
import WorkCard from "../Cards/WorkCard";
import ReviewCard from "../Cards/ReviewCard";
import { router } from "expo-router";
import TalentCard from "../Cards/TalentCard";
import { useAuth } from "../../context/AuthContext";
import { useKlayProfile } from "../../utils/KlayverProfile";
import UserAvatar from "react-native-user-avatar";
import { Use } from "react-native-svg";

const WalletPage = () => {
  const style = {};
  const { session, userAcc, loading } = useAuth();


  if (loading) {
    return (
      <View className="flex-1 min-h-screen items-center justify-center">
        <ActivityIndicator color={"orange"} size="large" />
      </View>
    );
  }

  if (userAcc.length === 0) {
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
                  @{session?.slice(0, 6)}...{session?.slice(30, 46)}
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
          {/** Talent Card section */}
          <TalentCard />

          {/** Task section */}
          <View className="mt-[22px]">
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

          <View className="mt-[22px] ">
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
          <View className="mt-[22px] mb-[99px]">
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
      </View>
    );
  }

  const item = userAcc[0]; // Assuming you are using only the first userAcc,
  return (
    <View>
      {userAcc.map((item: any, index: any) => (
        <View key={index} className="px-[20px] mt-[51px]">
          <View className="flex-row items-center justify-between min-w-full ">
            <View className="flex-row items-start space-x-[16px]">
              <UserAvatar name={item.name} />
              <View className="items-start pt-2">
                <Text className="text-[14px] font-bold text-black">
                  @<Text className="text-[18px]">{item.name}</Text>
                </Text>
                <Text className="text-[14px] text-[#BDBDBD] font-normal">
                  {item.profession}
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
          <Text className="text-[15px] font-medium text-[#4F4F4F] mt-[18px]">
            {item.bio}
          </Text>

          {/** Talent Card section */}
          <TalentCard name={item.name} amount={item.monthlyCharge} />

          {/** Task section */}
          <View className=" mt-[22px]">
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

          <View className="mt-[22px] ">
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
      ))}
    </View>
  );
};

export default WalletPage;
