import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const TaskCard = () => {
  return (
    <View className="pt-[11px] pb-[20px] pl-[21px] pr-[19px] bg-[#f4f4f4] space-y-[10px] w-[100%] rounded-[20px]">
      <View className="flex-row items-center justify-between ">
        <Text className="text-[16px] text-[#828282] font-normal">
          Description
        </Text>
        <TouchableOpacity className="border border-[#828282] px-[10px] py-[5px] rounded-full">
          <Text className="text-Orange text-[14px] text-right">Completed</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-[16px] font-normal text-[#292929]">
        Build an NFT marketplace
      </Text>
      <View className="flex-row items-center justify-around ">
        <TouchableOpacity className="flex-row items-center space-x-[8px] ">
          <FontAwesome name="database" size={20} color={"#FB8B04"} />
          <Text className="text-[16px] font-normal text-[#FB8B04]">
            100 AXL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-[8px] ">
          <FontAwesome name="clock-o" size={20} color={"#FB8B04"} />
          <Text className="text-[16px] font-normal text-[#FB8B04]">
            3 hours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-[8px]">
          <Image
            source={{
              uri: "https://images.pexels.com/photos/3938465/pexels-photo-3938465.jpeg?auto=compress&cs=tinysrgb&w=1600",
            }}
            className="w-[24px] h-[24px] object-contain rounded-[10px]"
          />
          <Text className="text-[12px] font-normal text-[#292929]">
            Completed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
