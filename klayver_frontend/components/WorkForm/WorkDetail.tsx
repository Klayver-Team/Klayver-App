import { View, Text, TextInput } from "react-native";
import React from "react";
import TalentCard from "../Cards/TalentCard";

const WorkDetail = () => {
  return (
    <View>
      <TalentCard />
      <View className="mx-[20px] mt-[16px]">
        <View className="items-stretch flex flex-col">
          <Text className="text-zinc-800 text-sm leading-5 w-full">Hours</Text>
          <TextInput
            placeholder="Enter the number of hours for your work"
            className="text-zinc-500 text-base leading-5 whitespace-nowrap bg-white w-full mt-2.5 px-5 py-7 rounded-3xl max-md:pl-0.5"
          />
        </View>
        <View className="items-stretch flex flex-col">
          <Text className="text-zinc-800 text-sm leading-5 w-full">Description</Text>
          <TextInput
            placeholder="Enter the number of hours for your work"
            className="text-zinc-500 text-base leading-5 whitespace-nowrap bg-white w-full mt-2.5 px-5 py-7 rounded-3xl max-md:pl-0.5"
            maxLength={600}
            multiline
            numberOfLines={6}
          />
        </View>
      </View>
    </View>
  );
};

export default WorkDetail;

/**
 * 
 *  <View >
            <Text>Enter the number of hours for your work</Text>
          </View>
 */
