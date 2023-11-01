import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { logo } from "../assets/images";
import { FontAwesome } from "@expo/vector-icons";

const WorkCard = () => {
  return (
    <View className="bg-[#fafafa] min-h-[359px] space-y-[16px] w-[359px] pt-[30px] pb-[29px] px-[22px] mb-[24px] rounded-[20px]">
      <View className="flex-row items-start space-x-4">
        <Image source={logo} />
        <View className="items-start">
          <Text className="text-[16px] font-bold">Klayver Social</Text>
          <Text className="text-[14px] text-[#BDBDBD] font-normal">Blockchain Engineer</Text>
        </View>
      </View>
      <Text className="text-[15px] font-normal leading-[24px]">
        Created and developed a robust social platform, Klayver, to offer
        extensive cybersecurity training and mentorship. Klayver's tailor-made
        learning environment offers immersive courses in malware analysis, risk
        management, and various other cybersecurity topics. These courses
        feature engaging video lessons, hands-on lab simulations, interactive
        quizzes, and coding challenges.
      </Text>
      <Pressable className="flex-row items-center space-x-2">
        <FontAwesome name="link" size={20} color="#FB8B04" />
        <Text className="text-Orange text-[14px] font-medium">www.klayver.io</Text>
        </Pressable>
    </View>
  );
};

export default WorkCard;
